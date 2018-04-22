import Router from 'koa-router'
import bcrypt from 'bcryptjs'

import { Db, Oauth, Fn } from '../utils'

export const sessions = Router()

/** 
 * @api {post} /api/sessions Sign in
 * @apiGroup Sessions
 * @apiParam {string} id User ID, can be id, username, mobilephone, email
 * @apiParam {string} password User password 
 * @apiParamExample {json} Request-example:
 *  {
 *    "id": "12345678901",
 *    "password": "000000" 
 *  }
 * @apiSuccess (200) {object} void User Object 
 * @apiSuccess (204) {void} void No returned object when no params are passed
 * @apiSuccess (403) {void} void No Access denied
 */
sessions.post('/', async (ctx) => {
  const user_info = ctx.decoded.user_info
  const { id, password } = ctx.request.body
  let data 

  try {
    // Sign in with user input credentials
    if (id && password) {
      const user = await Fn.getUser(id)
      if (user && bcrypt.compareSync(password, user.password)) {
        data = user
      }
    // Sign in with credentials in cookies if exist 
    } else if (user_info) {
      data = await Fn.getUser(user_info)
    // Newly visit
    } else {
      ctx.status = 204
      return
    }

    if (data) {
      delete data.dataValues.password

      // add majors list to the model
      let majors = await Db.model('user_major').findAll({ where: { user_id: user_info } })
      data.dataValues.majors = majors.map(each => each.major_id)

      const { token, expiresIn } = Oauth.signToken(data)
      ctx.cookies.set('user_info', token, {
        overwrite: true,
        maxAge: expiresIn
      })

      ctx.status = 200
      ctx.body = Fn.prettyJSON(data) 
    } else {
      ctx.status = 403
    }
  } catch (err) {
    Fn.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/sessions Sign out
 * @apiGroup Sessions
 * @apiSuccess (200) {void} void void
 */
sessions.delete('/', (ctx) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    Fn.logError(ctx, err)
  }
})
