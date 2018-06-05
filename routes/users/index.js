const Router = require('koa-router')
const R = require('ramda')

const { User, Schedule } = require('../../models')
const { General, Auth } = require('../../services')
const sessionsService = require('../sessions/service')
const service = require('./service')
const Database = require('../../database')
const c = require('../../config.js')

const users = Router()
const { protect } = Auth
const range = {
  cost: 9999,
  role_id: 10
}
const UserMajor = Database.model('user_major')

/** 
 * @api {get} /api/users Get all users
 * @apiGroup Users 
 * @apiParam (Query String) {String} [id] Filtered by user ID
 * @apiParam (Query String) {String} [mobilephone] Filtered by user mobilephone
 * @apiParam (Query String) {integer=1,2,3} [role_id=2,3] Filtered by user's role, 1=admin, 2=teacher, 3=student
 * @apiParam (Query String) {Boolean=0,1} [gender=0,1] Filtered by user gender
 * @apiParam (Query String) {String=online, offline, both} [place=both] Filtered by the place to have the class
 * @apiParam (Query String) {String} [city] Filtered by the city a user is living in, check "Cities list"
 * @apiParam (Query String) {String} [province] Filtered by the province a user is living in, check "Provinces list"
 * @apiParam (Query String) {String} [countries] Filtered by the country a user is living in, check "Countries list"
 * @apiParam (Query String) {Boolean=0,1} [active=0,1] Filtered by if a user wished to be found
 * @apiParam (Query String) {String=DESC, ASC} [cost] Sorting by cost
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiParamExample {json} Request-example:
 * /api/users?id=1&gender=1,0&place=online&role_id=1&city=4503,1101
 * @apiSuccess (200) {object[]} void Array contains all users
 */
users.get('/', async (ctx) => {
  try {
    const filters = ['id', 'mobilephone', 'role_id', 'gender', 'place', 'province', 'city', 'country', 'active']
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.getFilter(qs, filters)

    // this part is for majors filtering
    // if majors is given in the querystring then do the follow
    if (qs.majors) {
      const users_id = await UserMajor.findAll({
        where: { major_id: qs.majors.split(',') }
      })
      filter.push({ id: users_id.map(user => user.dataValues.user_id) })
    }

    let data = await User.findAll({ 
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter },
    })

    // Do not expose admin user
    data.shift(0)

    for (let i = 0; i < data.length; i++) {
      await service.processUserData(data[i].dataValues)
    }

    // Order for teacher 
    if (qs.role_id === '2') {
      data.map(each => {
        each.dataValues.weight = service.defaultOrder(each.dataValues)
      })

      if (R.has('cost')(qs)) {
        // Sort by cost
        if (qs.cost === 'ASC') {
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
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id Get a user
 * @apiGroup Users 
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
      ctx.body = General.prettyJSON(data)

    } else {
      ctx.status = 404
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/students Get a user's students
 * @apiGroup Users 
 * @apiParam (Query String) {Boolean=0,1} [finished=0,1] Filtered by if the schedule has been finished
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's students
 */
users.get('/:id/students', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.getFilter(qs, ['finished'])
    filter.push({ teacher_id: ctx.params.id })

    let data = await Schedule.findAll({
      where: { $and: filter }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { id: data.map(item => item.dataValues.student_id) },
    })

    for (let i = 0; i < data.length; i++) {
      await service.processUserData(data[i].dataValues)
    }

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/teachers Get a user's teachers
 * @apiGroup Users 
 * @apiParam (Query String) {Boolean=0,1} [finished=0,1] Filtered by if the schedule has been finished
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's teachers
 */
users.get('/:id/teachers', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.getFilter(qs, ['finished'])
    filter.push({ student_id: ctx.params.id })

    let data = await Schedule.findAll({
      where: { $and: filter }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { id: data.map(item => item.dataValues.teacher_id) },
    })

    for (let i = 0; i < data.length; i++) {
      await service.processUserData(data[i].dataValues)
    }

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/users Create a new user
 * @apiGroup Users 
 * @apiParam {String} [username=UUIDV1] The unique username
 * @apiParam {Number=1,2,3} [role_id=3] User's role, 1=admin, 2=teacher, 3=student
 * @apiParam {String} mobilephone User unique mobilephone number
 * @apiParam {String} email User unique email address
 * @apiParam {String} password User password 
 * @apiParam {String} name User name for display purpose only 
 * @apiParam {String} [school] The school name
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
 */
users.put('/', async (ctx) => {
  try {
    const input = ctx.request.body
    const { username, mobilephone, email } = ctx.request.body
    const account = username || mobilephone || email
    const user = await service.getOneUser(account)

    if (user) {
      ctx.status = 409
      return
    }

    let data = await User.create(input)
    data = await service.getOneUser(data.id)

    await service.processUserData(data.dataValues)
    const { id, password } = data.dataValues

    ctx.status = 201
    ctx.body = {
      data: General.prettyJSON(data),
      token: sessionsService.signToken({ id, password })
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/users/:id Update a user
 * @apiGroup Users 
 * @apiParam {String} [username=UUIDV1] The unique username
 * @apiParam {Number=1,2,3} [role_id=3] User's role, 1=admin, 2=teacher, 3=student
 * @apiParam {String} mobilephone User unique mobilephone number
 * @apiParam {String} email User unique email address
 * @apiParam {String} password User password 
 * @apiParam {String} name User name for display purpose only 
 * @apiParam {String} [school] The school name
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
  try {
    let data = await service.getOneUser(ctx.params.id)

    if (data) {
      const input = ctx.request.body
      const isOutRange = General.checkRange(range, input)
      const user_id = data.dataValues.id

      if (isOutRange) {
        ctx.status = 416
        ctx.body = isOutRange
        return
      }

      if (input.majors) {
        await UserMajor.destroy({ where: { user_id } })
        input.majors.map(async major_id => { await UserMajor.create({ user_id, major_id }) })
        await Database.sync()
      }

      if (user_id === ctx.state.currentUserID || ctx.state.isAdmin) {
        // Delete majors because it's not updated here
        delete input.majors
        data = await data.update(input)

        // do not send password to client
        delete data.dataValues.password

        // Add majors list
        const majors = await Database.model('user_major').findAll({ where: { user_id } })
        data.dataValues.majors = majors.map(each => each.major_id)

        ctx.status = 200
        ctx.body = General.prettyJSON(data)
      } else {
        ctx.status = 403
      }
    } else {
      ctx.status = 404
    }
  } catch (err) {
    General.logError(ctx, err)
  }
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