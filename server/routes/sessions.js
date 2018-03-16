import Router from 'koa-router'
import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'

import { User } from '../models'
import { signToken, prettyJSON } from '../utili'

const Op = Sequelize.Op
export const sessions = Router()

/** 
 * Sign in 
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
      const user = await User.findOne({
        where: { [Op.or]: [
          { username },
          { mobilephone: username },
          { email: username }
        ]}
      })
      if (user && bcrypt.compareSync(password, user.password)) {
        data = user
      }
    // Sign in with credentials in cookies if exist 
    } else if (id) {
      data = await User.findOne({ where: { id } })
    // Newly visit
    } else {
      ctx.status = 204
      return
    }

    if (data) {
      const { token, expiresIn } = signToken(data)
      ctx.cookies.set("user_info", token, {
        overwrite: true,
        maxAge: expiresIn
      })
      ctx.status = 200
      ctx.body = prettyJSON(data) 
    } else {
    ctx.status = 403
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Sign out 
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
