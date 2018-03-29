import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User, Major, User_Major } from '../models'
import { fn, db, oauth } from '../utili'
import config from '../config.js'

const Op = Sequelize.Op
export const users = Router()

/** 
 * Fetch all users
 * @method GET
 * @param {Object} ctx
 * @returns {Object} All users model
 */
users.get('/', async (ctx) => {
  try {
    const role_id = fn.parseQuerystring(ctx.request.querystring, 'role')
    const page = fn.parseQuerystring(ctx.request.querystring, 'page')
    const data = await User.findAll({ 
      where: role_id ? { role_id } : null,
      limit: config.limit,
      offset: page ? ( page - 1 ) * config.limit : 0,
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
 * Fetch a specific user
 * @method GET
 * @param {Object} ctx
 * @returns {Object} The user model
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
 * @param {Object} ctx
 * @returns {Object} Created user model
 */
users.put('/', async (ctx) => {
  try {
    const { name, mobilephone, password } = ctx.request.body
    const user = await User.create({ name,  mobilephone, password })
    const data = await fn.getUser(user.id, {
      attributes: { exclude: ['password'] }
    })
    if (data) {
      delete data.dataValues.password
      const { token, expiresIn } = oauth.signToken(data)
      ctx.cookies.set("user_info", token, {
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
 * @param {Object} ctx
 * @returns {Object} updated user model if success
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
    let info = ctx.request.body
    console.log(info)
    // Delete majors because it's not updated here
    delete info.majors
    if (data) {
      data = await data.update(info)
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
 * Delete a specific user
 * @method DELETE
 * @param {Object} ctx
 * @returns {void} status code
 */
users.delete('/:id', async (ctx) => {
  try {
    await User.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})
