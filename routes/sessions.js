const Router = require('koa-router')
const bcrypt = require('bcryptjs')

const { Oauth, General } = require('../utils')
const service = require('./users/service')
const Database = require('../database')

const sessions = Router()

/** 
 * @api {post} /api/sessions Sign in
 * @apiGroup Sessions
 * @apiDescription If now params are passed (id and password), a 204 respond will be returned
 * @apiParam {string} id User ID, can be id, username, mobilephone, email
 * @apiParam {string} password User password 
 * @apiParamExample {json} Request-example:
 *  {
 *    "id": "12345678901",
 *    "password": "000000" 
 *  }
 * @apiSuccess (200) {object} void User Object 
 * @apiSuccess (204) {void} void No returned object when no params are passed
 * @apiSuccess (403) {void} void Access denied, wrong user credentials
 */
sessions.post('/', async (ctx) => {
  const user_info = ctx.decoded.user_info
  const { id, password } = ctx.request.body
  let data 

  try {
    // Sign in with user input credentials
    if (id && password) {
      const user = await service.getOneUser(id)
      if (user && bcrypt.compareSync(password, user.password)) {
        data = user
      }
    // Sign in with credentials in cookies if exist 
    } else if (user_info) {
      data = await service.getOneUser(user_info)
    // Newly visit
    } else {
      ctx.status = 204
      return
    }

    if (data) {
      delete data.dataValues.password

      // add majors list to the model
      let majors = await Database.model('user_major').findAll({ where: { user_id: user_info } })
      data.dataValues.majors = majors.map(each => each.major_id)

      const { token, expiresIn } = Oauth.signToken(data)
      ctx.cookies.set('user_info', token, {
        overwrite: true,
        maxAge: expiresIn
      })

      ctx.status = 200
      ctx.body = { data: General.prettyJSON(data), token }
    } else {
      ctx.status = 403
    }
  } catch (err) {
    General.logError(ctx, err)
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
    General.logError(ctx, err)
  }
})

module.exports = { sessions }