const Router = require('koa-router')
const R = require('ramda')

const { User, Schedule } = require('../../models')
const { General, Middleware } = require('../../services')
const sessionsService = require('../sessions/service')
const service = require('./service')
const Database = require('../../database')
const c = require('../../config.js')

const users = Router()
const { authenticate } = Middleware
const range = {
  cost: 9999,
  role_id: 10
}
const FF = Database.model('follower_following')
const UM = Database.model('user_major')

/** 
 * @api {get} /api/users Get all users
 * @apiGroup Users 
 * @apiParam (Query String) {string} [id] Filtered by user ID
 * @apiParam (Query String) {string} [mobilephone] Filtered by user mobilephone
 * @apiParam (Query String) {integer=1,2,3} [role_id=2,3] Filtered by user's role, 1=admin, 2=teacher, 3=student
 * @apiParam (Query String) {boolean=0,1} [gender=0,1] Filtered by user gender
 * @apiParam (Query String) {string=online, offline, both} [place=both] Filtered by the place to have the class
 * @apiParam (Query String) {string} [city] Filtered by the city a user is living in, check "Cities list"
 * @apiParam (Query String) {string} [province] Filtered by the province a user is living in, check "Provinces list"
 * @apiParam (Query String) {string} [countries] Filtered by the country a user is living in, check "Countries list"
 * @apiParam (Query String) {boolean=0,1} [active=0,1] Filtered by if a user wished to be found
 * @apiParam (Query String) {string=DESC, ASC} [cost] Sorting by cost
 * @apiParam (Query String) {integer} [page=1] Pagination
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
      const users_id = await UM.findAll({
        where: { major_id: qs.majors.split(',') }
      })
      filter.push({ id: users_id.map(user => user.dataValues.user_id) })
    }

    let data = await User.findAll({ 
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter },
    })

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      await service.processUserDate(data[i].dataValues)
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
 * @apiSuccess (200) {object} void User object
 */
users.get('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const data = await service.getOneUser(id)

    if (data) {
      await service.processUserDate(data.dataValues)
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
 * @apiParam (Query String) {boolean=0,1} [finished=0,1] Filtered by if the schedule has been finished
 * @apiParam (Query String) {integer} [page=1] Pagination
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

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      await service.processUserDate(data[i].dataValues)
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
 * @apiParam (Query String) {boolean=0,1} [finished=0,1] Filtered by if the schedule has been finished
 * @apiParam (Query String) {integer} [page=1] Pagination
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

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      await service.processUserDate(data[i].dataValues)
    }

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/followers Get a user's followers
 * @apiGroup Users 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's followers
 */
users.get('/:id/followers', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let data = await FF.findAll({
      where: { following_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { id: data.map(item => item.dataValues.follower_id) },
    })

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      await service.processUserDate(data[i].dataValues)
    }

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/followings Get a user's followings
 * @apiGroup Users 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's followings
 */
users.get('/:id/followings', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let data = await FF.findAll({
      where: { follower_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { id: data.map(item => item.dataValues.following_id) },
    })

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      await service.processUserDate(data[i].dataValues)
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
 * @apiParam {string} [username=UUIDV1] The unique username
 * @apiParam {string=1,2,3} [role_id=3] User's role, 1=admin, 2=teacher, 3=student
 * @apiParam {string} mobilephone User unique mobilephone number
 * @apiParam {string} email User unique email address
 * @apiParam {string} password User password 
 * @apiParam {string} name User name for display purpose only 
 * @apiParam {string} [school] The school name
 * @apiParam {string} [title] The title 
 * @apiParam {string} [bio] The biography of the user
 * @apiParam {string=online, offline, both} [place=both] Where the user wish to have the class
 * @apiParam {string} [country] The code of country where the user lives in, check countries list
 * @apiParam {string} [province] The code of province where the user lives in, check provinces list
 * @apiParam {string} [city] The code of city where the user lives in, check cities list
 * @apiParam {boolean} [active=true] If user can be seached or not
 * @apiParam {boolean} [gender] User gender
 * @apiParam {number} [cost=0] The cost per hour of the user
 * @apiParam {number} [available=0] How much hours a user is opened for booking
 * @apiSuccess (201) {object} void The newly created user object
 */
users.put('/', authenticate, async (ctx) => {
  try {
    const input = ctx.request.body
    const user = await User.create(input)

    let data = await service.getOneUser(user.id)

    // Add majors list
    const majors = await Database.model('user_major').findAll({ where: { user_id: user.id } })
    data.dataValues.majors = majors.map(each => each.major_id)

    const { token, expiresIn } = sessionsService.signToken(data)
    ctx.cookies.set('user_info', token, {
      overwrite: true,
      maxAge: expiresIn
    })

    ctx.status = 201
    ctx.body = General.prettyJSON(data) 
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/users/:id Update a user
 * @apiGroup Users 
 * @apiParam {string} [username=UUIDV1] The unique username
 * @apiParam {string=1,2,3} [role_id=3] User's role, 1=admin, 2=teacher, 3=student
 * @apiParam {string} mobilephone User unique mobilephone number
 * @apiParam {string} email User unique email address
 * @apiParam {string} password User password 
 * @apiParam {string} name User name for display purpose only 
 * @apiParam {string} [school] The school name
 * @apiParam {string} [title] The title 
 * @apiParam {string} [bio] The biography of the user
 * @apiParam {string=online, offline, both} [place=both] Where the user wish to have the class
 * @apiParam {string} [country] The code of country where the user lives in, check countries list
 * @apiParam {string} [province] The code of province where the user lives in, check provinces list
 * @apiParam {string} [city] The code of city where the user lives in, check cities list
 * @apiParam {boolean} [active=true] If user can be seached or not
 * @apiParam {boolean} [gender] User gender
 * @apiParam {number} [cost=0] The cost per hour of the user
 * @apiParam {number} [available=0] How much hours a user is opened for booking
 * @apiSuccess (200) {object} void The updated user object
 */
users.post('/:id', authenticate, async (ctx) => {
  try {
    const user_id = ctx.params.id
    const input = ctx.request.body
    const isOutRange = General.checkRange(range, input)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange

    } else {
      if (input.majors) {
        await UM.destroy({ where: { user_id } })
        input.majors.map(async major_id => {
          await UM.create({ user_id, major_id })
        })
        await Database.sync()
      }

      let data = await service.getOneUser(user_id)
      if (data) {
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
        ctx.status = 404
      }
    }

  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/users/:id Delete a user
 * @apiGroup Users 
 * @apiSuccess (200) {void} void void
 */
users.delete('/:id', authenticate, async (ctx) => {
  try {
    await User.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { users }