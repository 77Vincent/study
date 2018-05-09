const Router = require('koa-router')

const { Major } = require('../models')
const { General, Auth } = require('../services')

const majors = Router()
const { authenticate } = Auth

/** 
 * @api {get} /api/majors/ Get all majors
 * @apiGroup Majors 
 * @apiSuccess (200) {object[]} void Array contains all majors
 */
majors.get('/', async (ctx) => {
  try {
    const data = await Major.findAll()

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/majors/ Create a major
 * @apiGroup Majors 
 * @apiParam {string} label The major name
 * @apiParam {string} [description] The major description
 * @apiSuccess (200) {object} void The created major 
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
majors.put('/', authenticate, async (ctx) => {
  try {
    const { label, description } = ctx.request.body
    const data = await Major.create({ label, description })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { majors }