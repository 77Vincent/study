import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User, Major, User_Major } from '../models'
import { fn, db, oauth } from '../utili'
import c from '../config.js'

const Op = Sequelize.Op
export const users = Router()

/** 
 * Fetch all users
 * @method GET
 * @param {object} ctx - koa http context object
 * @returns {object} all users
 */
users.get('/', async (ctx) => {
  try {
    const role_id = fn.parseQuerystring(ctx.request.querystring, 'role')
    const page = fn.parseQuerystring(ctx.request.querystring, 'page')

    const data = await User.findAll({ 
      where: role_id ? { role_id } : null,
      limit: c.limit,
      offset: page ? ( page - 1 ) * c.limit : 0,
      include: [{ model: Major, attributes: ['id'] }],
      attributes: { exclude: ['password'] }
    })
    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Fetch a user
 * @method GET
 * @param {object} ctx - koa http context object
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
      ctx.status = 204
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Create a user 
 * @method PUT 
 * @param {object} ctx - koa http context object
 * @returns {object} the created user
 */
users.put('/', async (ctx) => {
  try {
    const { name, mobilephone, password } = ctx.request.body
    const user = await User.create({ name, mobilephone, password })
    const data = await fn.getUser(user.id, {
      attributes: { exclude: ['password'] }
    })
    if (data) {
      delete data.dataValues.password
      const { token, expiresIn } = oauth.signToken(data)
      ctx.cookies.set("user_values", token, {
        overwrite: true,
        maxAge: expiresIn
      })
      ctx.status = 201
      ctx.body = fn.prettyJSON(data) 
    } else {
      ctx.status = 204
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Update a user 
 * @method POST 
 * @param {object} ctx - koa http context object
 * @returns {object} the updated user if success
 */
users.post('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    await User_Major.destroy({
      where: { user_id: id }
    })
    ctx.request.body.majors.map(async item => {
      await User_Major.create({
        user_id: id,
        major_id: item
      })
    })
    await db.sync()
    let data = await fn.getUser(id)
    let values = ctx.request.body
    // Delete majors because it's not updated here
    delete values.majors
    if (data) {
      data = await data.update(values)
      delete data.dataValues.password
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

/**
 * Delete a user
 * @method DELETE
 * @param {object} ctx - koa http context object
 * @returns {void}
 */
users.delete('/:id', async (ctx) => {
  try {
    await User.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.cookies.set('user_values', null)
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})
