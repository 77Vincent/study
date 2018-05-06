const Router = require('koa-router')

const { General } = require('../../services')
const service = require('./service')
const sessionsService = require('../sessions/service')
const Database = require('../../database')

const sessions = Router()

/** 
 * @api {post} /api/sessions Sign in
 * @apiGroup Sessions
 * @apiParam {string} id User ID, can be id, username, mobilephone, email
 * @apiParam {string} password User password 
 * @apiSuccess (200) {object} void Object containing user object and token
 * @apiSuccess (401) {void} void Authentication failed
 */
sessions.post('/', async (ctx) => {
  try {
    const { id, password } = ctx.request.body
    const token = sessionsService.getToken(ctx.request.headers.authorization)
    let data = await service.auth(id, password, token)    

    if (data) {
      delete data.dataValues.password

      // add majors list to the model
      let majors = await Database.model('user_major').findAll({ where: { user_id: data.dataValues.id } })
      data.dataValues.majors = majors.map(each => each.major_id)

      const { token, expiresIn } = service.signToken(data.dataValues.username)
      ctx.cookies.set('user_info', token, {
        overwrite: true,
        maxAge: expiresIn
      })

      ctx.status = 200
      ctx.body = { data: General.prettyJSON(data), token }
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
sessions.delete('/', (ctx) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { sessions }