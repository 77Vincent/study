import Router from 'koa-router'

import { User } from '../models'
import { fn, db, oauth } from '../utils'
import c from '../config.js'

export const users = Router()

const FF = db.model('follower_following')
const ST = db.model('student_teacher')
const UM = db.model('user_major')

const urls = ['followers', 'followings', 'students', 'teachers']
const urlsByQuerystring = ['posts', 'courses']

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
 * @apiParam (Query String) {string} [id] User ID
 * @apiParam (Query String) {string} [mobilephone] User mobilephone
 * @apiParam (Query String) {string='teacher', 'student', 'admin'} [role_id='teacher,student'] User's role
 * @apiParam (Query String) {boolean=0,1} [gender=0,1] User gender
 * @apiParam (Query String) {string='online','offline','both'} [place='both'] Where do the users want to have the class
 * @apiParam (Query String) {string} [city] The city a user is currently living in, check cities list
 * @apiParam (Query String) {string} [province] The province a user is currently living in, check provinces list
 * @apiParam (Query String) {string} [countries] The countries a user is currently living in, check countries list
 * @apiParam (Query String) {boolean} [active=0,1] Is a user wished to be found
 * @apiParam (Query String) {boolean} [available=0,1] Is a user opened for booking
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiParamExample {json} Request-example:
 * /api/users?id=1&gender=1,0&place=online&role_id=teacher&city=4503,1101
 * @apiSuccess (200) {object[]} void Array contains all users object
 */
users.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let filter = fn.objToObjGroupsInArr(qs, filters)
    let sorting = []

    for (let key in qs) {
      // ASC as default order
      if (sortings.indexOf(key) !== -1) {
        qs[key] = qs[key] === 'DESC' ? 'DESC' : 'ASC'
        sorting.push([key, qs[key]])
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
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { $and: filter },
      order: sorting,
      attributes: { exclude: ['password'] }
    })

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      let current = data[i].dataValues
      let followers = await FF.findAll({ where: { following_id: current.id } })
      let followings = await FF.findAll({ where: { follower_id: current.id } })
      let majors = await UM.findAll({ where: { user_id: current.id } })

      current.majors = majors.map(major => major.major_id)
      current.followers = followers.length
      current.followings = followings.length

      urlsByQuerystring.map(each => {
        current[`${each}_url`] = fn.getDomain(`/api/${each}?user_id=${current.id}`)
      })
      urls.map(each => {
        current[`${each}_url`] = fn.getDomain(`/api/users/${current.id}/${each}`)
      })
    }

    fn.simpleSend(ctx, data)
  } catch (err) {
    fn.logError(ctx, err)
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
    let data = await fn.getUser(id, { attributes: { exclude: ['password'] } })

    if (data) {
      let dv = data.dataValues
      
      let followers = await FF.findAll({ where: { following_id: id } })
      let followings = await FF.findAll({ where: { follower_id: id } })
      let majors = await UM.findAll({ where: { user_id: id } })

      dv.majors = majors.map(major => major.major_id)
      dv.followers = followers.length
      dv.followings = followings.length

      urlsByQuerystring.map(each => {
        dv[`${each}_url`] = fn.getDomain(`/api/${each}?user_id=${id}`)
      })
      urls.map(url => {
        dv[`${url}_url`] = fn.getDomain(`/api/users/${id}/${url}`)
      })

      fn.simpleSend(ctx, data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    fn.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/students Get a user's students
 * @apiGroup Users 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array containing a user's students
 */
users.get('/:id/students', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await ST.findAll({ where: { teacher_id: ctx.params.id } })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.student_id) },
      attributes: { exclude: ['password'] }
    })

    fn.simpleSend(ctx, data)
  } catch (err) {
    fn.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/teachers Get a user's teachers
 * @apiGroup Users 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array containing a user's teachers
 */
users.get('/:id/teachers', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await ST.findAll({ where: { student_id: ctx.params.id } })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.teacher_id) },
      attributes: { exclude: ['password'] }
    })

    fn.simpleSend(ctx, data)
  } catch (err) {
    fn.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/followers Get a user's followers
 * @apiGroup Users 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array containing a user's followers
 */
users.get('/:id/followers', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await FF.findAll({
      where: { following_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.follower_id) },
      attributes: { exclude: ['password'] }
    })

    fn.simpleSend(ctx, data)
  } catch (err) {
    fn.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/users/:id/followings Get a user's followings
 * @apiGroup Users 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array containing a user's followings
 */
users.get('/:id/followings', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await FF.findAll({
      where: { follower_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.following_id) },
      attributes: { exclude: ['password'] }
    })

    fn.simpleSend(ctx, data)
  } catch (err) {
    fn.logError(ctx, err)
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
    const data = await fn.getUser(user.id, {
      attributes: { exclude: ['password'] }
    })

    // Add majors list
    const majors = await db.model('user_major').findAll({ where: { user_id: user.id } })
    data.dataValues.majors = majors.map(each => each.major_id)

    const { token, expiresIn } = oauth.signToken(data)
    ctx.cookies.set('user_info', token, {
      overwrite: true,
      maxAge: expiresIn
    })

    ctx.status = 201
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    fn.logError(ctx, err)
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
    await db.sync()

    let data = await fn.getUser(user_id)
    // Delete majors because it's not updated here
    delete values.majors
    data = await data.update(values)

    // do not send password to client
    delete data.dataValues.password

    // Add majors list
    const majors = await db.model('user_major').findAll({ where: { user_id } })
    data.dataValues.majors = majors.map(each => each.major_id)

    fn.simpleSend(ctx, data)
  } catch (err) {
    fn.logError(ctx, err)
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
    fn.logError(ctx, err)
  }
})
