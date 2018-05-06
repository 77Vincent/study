const Router = require('koa-router')

const { General, Middleware } = require('../../services')
const service = require('./service')
const usersService = require('../users/service')

const sessions = Router()
const { authenticate } = Middleware

/** 
 * @api {post} /api/sessions Sign in
 * @apiGroup Sessions
 * @apiParam {string} id User ID, can be id, username, mobilephone, email
 * @apiParam {string} password User password 
 * @apiSuccess (200) {object} void Object containing user object and token
 * @apiSuccess (401) {void} void Authentication failed
 */
sessions.post('/', authenticate, async (ctx) => {
  try {
    const { user } = ctx.state
    if (user) {
      await usersService.processUserDate(user.dataValues)
      const { token, expiresIn } = service.signToken(user.dataValues.username)
      ctx.cookies.set('user_info', token, {
        overwrite: true,
        maxAge: expiresIn
      })

      ctx.status = 200
      ctx.body = { data: General.prettyJSON(user), token }
    } else {
      ctx.status = 401
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
sessions.delete('/', authenticate, (ctx) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { sessions }