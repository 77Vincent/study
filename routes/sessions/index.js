const Router = require('koa-router')
const bcrypt = require('bcryptjs')

const { General } = require('../../services')
const service = require('./service')
const usersService = require('../users/service')

const sessions = Router()

/** 
 * @api {post} /api/sessions Sign in
 * @apiGroup Sessions
 * @apiParam {string} id User ID
 * @apiParam {string} password User password 
 * @apiSuccess (200) {object} void Object containing user object and token
 * @apiSuccess (401) {void} void Authentication failed
 */
sessions.post('/', async (ctx) => {
  try {
    const { id, password } = ctx.request.body
    const user = await usersService.getOneUser(id)

    if (user && bcrypt.compareSync(password, user.password)) {
      await usersService.processUserDate(user)
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