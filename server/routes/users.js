import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User, Major } from '../models'
import { fn } from '../utili'
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
    let data
    const role = fn.parseQuerystring(ctx.request.querystring, 'role')
    if (role) {
      data = await User.findAll({ 
        where: { role },
        limit: config.limit
      })
    } else {
      data = await User.findAll({ limit: config.limit })
    }
    if (data && data.length) {
      data = data.map(item => {
        // Do not show password to client
        delete item.dataValues.password 
        return item
      })
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
users.get('/:username', async (ctx) => {
  try {
    const data = await User.findOne({ 
      where: { username: ctx.params.username }
    })
    if (data) {
      // Do not show password to client
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
 * Create a user 
 * @method PUT 
 * @param {Object} ctx
 * @returns {Object} Created user model
 */
users.put('/', async (ctx) => {
  try {
    const data = await User.create(ctx.request.body)
    ctx.status = 201
    ctx.body = fn.prettyJSON(data)
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Update a specific user 
 * @method POST 
 * @param {Object} ctx
 * @returns {Object} updated user model if success
 */
users.post('/:username', async (ctx) => {
  try {
    let data = await User.findOne({ 
      where: { username: ctx.params.username }
    })
    data = await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = fn.prettyJSON(data)
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
users.delete('/', async (ctx) => {
  try {
    await User.destroy({ where: { id: ctx.decoded.user_info } })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})
