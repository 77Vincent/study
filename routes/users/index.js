const Router = require('koa-router')
const R = require('ramda')
const querystring = require('querystring')

const { User, Schedule } = require('../../models')
const { General, Auth, sequelizeWhere } = require('../../services')
const sessionsService = require('../sessions/service')
const service = require('./service')
const config = require('../../config.js')

const users = Router()
const { protect } = Auth
const range = {
  cost: 9999,
  role_id: 10,
}

/**
 * @api {get} /api/users Get all users
 * @apiGroup Users
 * @apiParam (Query String) {String} [id]
 * @apiParam (Query String) {Integer} [role_id=1,2]
 * @apiParam (Query String) {Boolean=0,1} [gender=0,1]
 * @apiParam (Query String) {Boolean=0,1} [active=1]
 * @apiParam (Query String) {String} [city]
 * @apiParam (Query String) {Integer} [country_id]
 * @apiParam (Query String) {Integer} [school_id]
 * @apiParam (Query String) {Integer} [major_id]
 * @apiParam (Query String) {Integer=1,2,3,4} [place_id=1,2,3,4]
 * @apiParam (Query String) {Integer=0,1,2,3} [degree_id=0,1,2,3]
 * @apiParam (Query String) {Integer=0,1,2,3} [status_id=0,1,2,3]
 * @apiParam (Query String) {String=DESC, ASC} [cost]
 * @apiParam (Query String) {Integer} [page=1]
 * @apiSuccess (200) {object[]} void Array contains all
 */
users.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await User.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      include: service.include(ctx),
      where: sequelizeWhere(ctx.request.querystring, {
        filterBy: ['id', 'role_id', 'gender', 'city', 'active', 'degree_id', 'status'],
      }),
    })

    for (let i = 0; i < data.length; i += 1) {
      await service.processUserData(data[i].dataValues)
    }

    // Order for teacher
    if (query.role_id === '1') {
      for (let i = 0; i < data.length; i += 1) {
        data[i].dataValues.weight = service.defaultOrder(data[i].dataValues)
      }

      if (R.has('cost')(query)) {
        // Sort by cost
        if (query.cost === 'ASC') {
          data.sort((a, b) => a.dataValues.cost - b.dataValues.cost)
        } else {
          data.sort((a, b) => b.dataValues.cost - a.dataValues.cost)
        }
      } else {
        // Sort by weight by default
        data.sort((a, b) => b.dataValues.weight - a.dataValues.weight)
      }
    }

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {get} /api/users/:account Get a user
 * @apiGroup Users
 * @apiDescription The account could be id, username, mobilephone, email
 * @apiSuccess (200) {Object} void User object
 * @apiError {String} 404 The requested content is found
 */
users.get('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const data = await service.getOneUser(id)

    if (data) {
      await service.processUserData(data.dataValues)
      ctx.status = 200
      ctx.body = data
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {get} /api/users/:id/students Get a user's students
 * @apiGroup Users
 * @apiParam (Query String) {Boolean=0,1} [finished=0,1] Filtered by if the schedule is finished
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's students
 */
users.get('/:id/students', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const schedules = await Schedule.findAll({
      where: sequelizeWhere(ctx.request.querystring, {
        prefilter: { teacher_id: ctx.params.id },
        filterBy: ['finished'],
      }),
    })

    const data = await User.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      include: service.include(ctx),
      where: { id: schedules.map(each => each.dataValues.student_id) },
    })

    for (let i = 0; i < data.length; i += 1) {
      await service.processUserData(data[i].dataValues)
    }

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {get} /api/users/:id/teachers Get a user's teachers
 * @apiGroup Users
 * @apiParam (Query String) {Boolean=0,1} [finished=0,1] Filtered by if the schedule is finished
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's teachers
 */
users.get('/:id/teachers', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const schedules = await Schedule.findAll({
      where: sequelizeWhere(ctx.request.querystring, {
        prefilter: { student_id: ctx.params.id },
        filterBy: ['finished'],
      }),
    })

    const data = await User.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      include: service.include(ctx),
      where: { id: schedules.map(each => each.dataValues.teacher_id) },
    })

    for (let i = 0; i < data.length; i += 1) {
      await service.processUserData(data[i].dataValues)
    }

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/users Create a new user
 * @apiGroup Users
 * @apiParam {String} [username=UUIDV1] The unique username
 * @apiParam {Number=1,2} [role_id=2] User's role
 * @apiParam {String} mobilephone User unique mobilephone number
 * @apiParam {String} email User unique email address
 * @apiParam {String} password User password
 * @apiParam {String} name User name for display purpose only
 * @apiParam {String} [school_id] School ID
 * @apiParam {String} [title] The title
 * @apiParam {String} [bio] The biography of the user
 * @apiParam {String=online, offline, both} [place=both] Where the user wish to have the class
 * @apiParam {String} [country] The code of country where the user lives in, check countries list
 * @apiParam {String} [province] The code of province where the user lives in, check provinces list
 * @apiParam {String} [city] The code of city where the user lives in, check cities list
 * @apiParam {Boolean} [active=true] If user can be seached or not
 * @apiParam {Boolean} [gender] User gender
 * @apiParam {Number} [cost=0] The cost per hour of the user
 * @apiParam {Number} [available=0] How much hours a user is opened for booking
 * @apiSuccess (201) {Object} void The newly created user object
 * @apiError {String} 409 The resource being created already exists
 */
users.put('/', async (ctx) => {
  try {
    const input = ctx.request.body
    const {
      username, mobilephone, email, password,
    } = ctx.request.body
    const account = username || mobilephone || email
    let user = await service.getOneUser(account)

    if (user) {
      ctx.status = 409
      return
    }

    user = await User.create(input)
    user = await service.getOneUser(user.id)

    const { id } = user.dataValues
    await service.processUserData(user.dataValues)

    ctx.status = 201
    ctx.body = {
      data: user,
      token: sessionsService.signToken({ id, password }),
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/users/:id Update a user
 * @apiGroup Users
 * @apiParam {String} [username=UUIDV1] The unique username
 * @apiParam {Number=1,2} role_id User's role
 * @apiParam {String} mobilephone User unique mobilephone number
 * @apiParam {String} email User unique email address
 * @apiParam {String} password User password
 * @apiParam {String} name User name for display purpose only
 * @apiParam {String} [school_id] The school ID
 * @apiParam {String} [title] The title
 * @apiParam {String} [bio] The biography of the user
 * @apiParam {String=online, offline, both} [place=both] Where the user wish to have the class
 * @apiParam {String} [country] The code of country where the user lives in, check countries list
 * @apiParam {String} [province] The code of province where the user lives in, check provinces list
 * @apiParam {String} [city] The code of city where the user lives in, check cities list
 * @apiParam {Boolean} [active=true] If user can be seached or not
 * @apiParam {Boolean} [gender] User gender
 * @apiParam {Number} [cost=0] The cost per hour of the user
 * @apiParam {Number} [available=0] How much hours a user is opened for booking
 * @apiSuccess (200) {Object} void The updated user object
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 * @apiError {String} 416 Range not satisfiable
 */
users.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, User, async (user) => {
    const input = ctx.request.body
    const isOutRange = General.checkRange(range, input)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange
      return
    }

    const data = await user.update(input)
    await service.processUserData(user.dataValues)

    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/users/:id Delete a user
 * @apiGroup Users
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
users.delete('/:id', protect, async (ctx) => {
  try {
    const data = await service.getOneUser(ctx.params.id)

    if (data) {
      const { id } = data.dataValues
      if (id === ctx.state.currentUserID || ctx.state.isAdmin) {
        await User.destroy({ where: { id } })
        ctx.status = 200
      } else {
        ctx.status = 403
      }
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { users }
