import Router from 'koa-router'

import { User } from '../models'
import { General, Db, Oauth, UserUtils } from '../utils'
import c from '../config.js'

export const users = Router()

const FF = Db.model('follower_following')
const ST = Db.model('student_teacher')
const UM = Db.model('user_major')

const filters = [
  'id',
  'mobilephone',
  'role_id',
  'gender',
  'place',
  'province',
  'city',
  'country',
  'active',
  'available'
]
const sortings = ['cost']

/** 
 * @api {get} /api/users Get all users
 * @apiGroup Users 
 * @apiParam (Query String) {string} [id] Filtered by user ID
 * @apiParam (Query String) {string} [mobilephone] Filtered by user mobilephone
 * @apiParam (Query String) {string='teacher', 'student', 'admin'} [role_id='teacher,student'] Filtered by user's role
 * @apiParam (Query String) {boolean=0,1} [gender=0,1] Filtered by user gender
 * @apiParam (Query String) {string='online','offline','both'} [place='both'] Filtered by the place to have the class
 * @apiParam (Query String) {string} [city] Filtered by the city a user is living in, check "Cities list"
 * @apiParam (Query String) {string} [province] Filtered by the province a user is living in, check "Provinces list"
 * @apiParam (Query String) {string} [countries] Filtered by the country a user is living in, check "Countries list"
 * @apiParam (Query String) {boolean=0,1} [active=0,1] Filtered by if a user wished to be found
 * @apiParam (Query String) {boolean=0,1} [available=0,1] Filtered by if a user is opened for booking
 * @apiParam (Query String) {string='DESC', 'ASC'} [cost] Sorting by cost
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiParamExample {json} Request-example:
 * /api/users?id=1&gender=1,0&place=online&role_id=teacher&city=4503,1101
 * @apiSuccess (200) {object[]} void Array contains all users
 */
users.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let filter = General.objToObjGroupsInArr(qs, filters)
    let sorting = []

    for (let key in qs) {
      // ASC as default order
      if (sortings.indexOf(key) !== -1) {
        qs[key] = qs[key] === 'DESC' ? 'DESC' : 'ASC'
        sorting.splice(0, 0, [key, qs[key]])
      }
    }

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
      order: sorting,
      attributes: { exclude: ['password'] }
    })

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      await UserUtils.addFields(data[i].dataValues, data[i].dataValues.id)
    }

    General.simpleSend(ctx, data)
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
    let id = ctx.params.id
    let data = await UserUtils.getOneUser(id, { attributes: { exclude: ['password'] } })

    if (data) {
      await UserUtils.addFields(data.dataValues, id)
      
      General.simpleSend(ctx, data)
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
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's students
 */
users.get('/:id/students', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let data = await ST.findAll({ where: { teacher_id: ctx.params.id } })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { id: data.map(item => item.dataValues.student_id) },
      attributes: { exclude: ['password'] }
    })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/teachers Get a user's teachers
 * @apiGroup Users 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains a user's teachers
 */
users.get('/:id/teachers', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let data = await ST.findAll({ where: { student_id: ctx.params.id } })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { id: data.map(item => item.dataValues.teacher_id) },
      attributes: { exclude: ['password'] }
    })

    General.simpleSend(ctx, data)
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
      attributes: { exclude: ['password'] }
    })

    General.simpleSend(ctx, data)
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
      attributes: { exclude: ['password'] }
    })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/users Create a new user
 * @apiGroup Users 
 * @apiParam {string} name User name
 * @apiParam {string} mobilephone User mobilephone number
 * @apiParam {string} password User passowrd
 * @apiParamExample {json} Request-example:
 *  {
 *    "name": "Tony",
 *    "mobilephone": "12345678901",
 *    "password": "000000" 
 *  }
 * @apiSuccess (201) {object} void The newly created user object
 */
users.put('/', async (ctx) => {
  try {
    const { name, mobilephone, password } = ctx.request.body
    const user = await User.create({ name, mobilephone, password })
    const data = await UserUtils.getOneUser(user.id, {
      attributes: { exclude: ['password'] }
    })

    // Add majors list
    const majors = await Db.model('user_major').findAll({ where: { user_id: user.id } })
    data.dataValues.majors = majors.map(each => each.major_id)

    const { token, expiresIn } = Oauth.signToken(data)
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
 * @apiSuccess (200) {object} void The updated user object
 */
users.post('/:id', async (ctx) => {
  try {
    const user_id = ctx.params.id
    let values = ctx.request.body

    await UM.destroy({
      where: { user_id }
    })
    values.majors.map(async major_id => {
      await UM.create({ user_id, major_id })
    })
    await Db.sync()

    let data = await UserUtils.getOneUser(user_id)
    // Delete majors because it's not updated here
    delete values.majors
    data = await data.update(values)

    // do not send password to client
    delete data.dataValues.password

    // Add majors list
    const majors = await Db.model('user_major').findAll({ where: { user_id } })
    data.dataValues.majors = majors.map(each => each.major_id)

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/users/:id Delete a user
 * @apiGroup Users 
 * @apiSuccess (200) {void} void void
 */
users.delete('/:id', async (ctx) => {
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
