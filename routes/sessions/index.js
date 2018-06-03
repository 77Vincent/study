const Router = require('koa-router')
const bcrypt = require('bcryptjs')

const { General } = require('../../services')
const service = require('./service')
const usersService = require('../users/service')

const sessions = Router()

/** 
 * @api {post} /api/sessions Sign in
 * @apiGroup Sessions
 * @apiParam {String} id User ID (id, username, mobilephone, email)
 * @apiParam {String} password User password 
 * @apiSuccess (200) {Object} void Object containing user object and token
 * @apiSuccess (401) {Void} void Authentication failed
 */
sessions.post('/', async (ctx) => {
  try {
    const { id, password } = ctx.request.body
    const user = await usersService.getOneUser(id)

    if (user && bcrypt.compareSync(password, user.password)) {
      await usersService.processUserData(user)
      ctx.status = 200
      ctx.body = {
        data: General.prettyJSON(user),
        token: service.signToken({ id, password })
      }
    } else {
      ctx.status = 401
    }

  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { sessions }