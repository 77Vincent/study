import Router from 'koa-router'

import { User, Major } from '../models'
import { fn, db, oauth } from '../utils'
import c from '../config.js'

export const users = Router()

/** 
 * Fetch all users
 * @method GET
 * @param {string} role_id
 * @returns {object} all users
 */
users.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)

    // only use filters that's included
    const filters = [ 'role_id', 'gender', 'place', 'province', 'city', 'country', 'id', 'mobilephone' ]
    const sortings = ['cost']

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
      const users_id = await db.model('user_major').findAll({
        where: { major_id: qs.majors.split(',') }
      })
      filter.push({ id: users_id.map(user => user.dataValues.user_id) })
    }

    let data = await User.findAll({ 
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { $and: filter },
      order: sorting,
      include: [
        { model: Major, attributes: ['id'] },
        { model: User, as: 'Follower', attributes: ['id'] },
        { model: User, as: 'Following', attributes: ['id'] }
      ],
      attributes: { exclude: ['password'] }
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

/** 
 * Fetch a user
 * @method GET
 * @param {number} id - user id
 * @returns {object} the user
 */
users.get('/:id', async (ctx) => {
  try {
    const data = await fn.getUser(ctx.params.id, {
      attributes: { exclude: ['password'] }
    })
    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

/** 
 * Fetch a user's followers 
 * @method GET
 * @param {number} id - user id
 * @returns {object} the user
 */
users.get('/:id/followers', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await db.model('follower_following').findAll({
      where: { following_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.follower_id) }
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

/** 
 * Fetch a user's followings
 * @method GET
 * @param {number} id - user id
 * @returns {object} the user
 */
users.get('/:id/followings', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await db.model('follower_following').findAll({
      where: { follower_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.following_id) }
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

/** 
 * Create a user 
 * @method PUT 
 * @param {string} name - displayed name
 * @param {string} mobilephone
 * @param {string} password
 * @returns {object} the created user
 */
users.put('/', async (ctx) => {
  try {
    const { name, mobilephone, password } = ctx.request.body
    const user = await User.create({ name, mobilephone, password })
    const data = await fn.getUser(user.id, {
      attributes: { exclude: ['password'] }
    })
    const { token, expiresIn } = oauth.signToken(data)
    ctx.cookies.set('user_info', token, {
      overwrite: true,
      maxAge: expiresIn
    })
    ctx.status = 201
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

/** 
 * Update a user 
 * @method POST 
 * @param {object} values - new user info
 * @returns {object} the updated user if success
 */
users.post('/:id', async (ctx) => {
  try {
    const user_id = ctx.params.id
    let values = ctx.request.body

    await db.model('user_major').destroy({
      where: { user_id }
    })
    values.majors.map(async major_id => {
      await db.model('user_major').create({ user_id, major_id })
    })
    await db.sync()
    let data = await fn.getUser(user_id)
    // Delete majors because it's not updated here
    delete values.majors
    data = await data.update(values)
    // do not send password to client
    delete data.dataValues.password
    ctx.status = 200
    ctx.body = fn.prettyJSON(data)
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

/**
 * Delete a user
 * @method DELETE
 * @param {number} id - user id
 * @returns {void}
 */
users.delete('/:id', async (ctx) => {
  try {
    await User.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})
