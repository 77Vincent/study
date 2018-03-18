import Router from 'koa-router'
import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'

import { User } from '../models'
import { oauth, fn } from '../utili'

const Op = Sequelize.Op
export const sessions = Router()

/** 
 * Sign in 
 * @method POST 
 * @param {Object} ctx
 * @returns {Object} user model 
 */
sessions.post('/', async (ctx) => {
  const id = ctx.decoded.user_info
  const { username, password } = ctx.request.body
  let data 

  try {
    // Sign in with user input credentials
    if (username && password) {
      const user = await fn.getUser(username)
      if (user && bcrypt.compareSync(password, user.password)) {
        data = user
      }
    // Sign in with credentials in cookies if exist 
    } else if (id) {
      data = await fn.getUser(id)
    // Newly visit
    } else {
      ctx.status = 204
      return
    }

    if (data) {
      const { token, expiresIn } = oauth.signToken(data)
      delete data.dataValues.password
      ctx.cookies.set("user_info", token, {
        overwrite: true,
        maxAge: expiresIn
      })
      ctx.status = 200
      ctx.body = fn.prettyJSON(data) 
    } else {
    ctx.status = 403
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Sign out 
 * @method DELETE 
 * @param {Object} ctx
 * @returns {void} status code
 */
sessions.delete('/', async (ctx) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})
