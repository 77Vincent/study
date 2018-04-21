import Router from 'koa-router'
import bcrypt from 'bcryptjs'

import { oauth, fn } from '../utils'

export const sessions = Router()

/** 
 * @api {post} /api/sessions Sign in
 * @apiGroup Session 
 * @apiParam {String} id User's unique ID (id, mobilephone, email)
 * @apiParam {String} password User's password 
 * @apiSuccess (200) {Object} object user object
 * @apiSuccess (204) {void} void
 */
sessions.post('/', async (ctx) => {
  const user_info = ctx.decoded.user_info
  const { id, password } = ctx.request.body
  let data 

  try {
    // Sign in with user input credentials
    if (id && password) {
      const user = await fn.getUser(id)
      if (user && bcrypt.compareSync(password, user.password)) {
        data = user
      }
    // Sign in with credentials in cookies if exist 
    } else if (user_info) {
      data = await fn.getUser(user_info)
    // Newly visit
    } else {
      ctx.status = 204
      return
    }

    if (data) {
      delete data.dataValues.password
      const { token, expiresIn } = oauth.signToken(data)
      ctx.cookies.set('user_info', token, {
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
 * @api {delete} /api/sessions Sign out
 * @apiGroup Session 
 * @apiSuccess (200) {void} void
 */
sessions.delete('/', async (ctx) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})
