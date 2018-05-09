const Router = require('koa-router')

const { Role } = require('../models')
const { General, Auth } = require('../services')

const roles = Router()
const { authenticate } = Auth

/** 
 * @api {get} /api/roles/ Get all roles
 * @apiDescription 0=admin, 1=teacher, 2=student
 * @apiGroup Roles 
 * @apiSuccess (200) {object[]} void Array contains all roles
 */
roles.get('/', async (ctx) => {
  try {
    const data = await Role.findAll()

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/roles/ Create a role 
 * @apiDescription 0=admin, 1=teacher, 2=student
 * @apiGroup Roles 
 * @apiSuccess (200) {object} void The created role 
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
roles.put('/', authenticate, async (ctx) => {
  try {
    const { label } = ctx.request.body
    const data = await Role.create({ label })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { roles }