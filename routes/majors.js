const Router = require('koa-router')

const { Major } = require('../models')
const { General, Auth, Routing } = require('../services')

const majors = Router()
const { protect } = Auth

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
 * @apiSuccess (201) {object} void The created major 
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 */
majors.put('/', protect, async (ctx) => {
  try {
    const { label, description } = ctx.request.body
    const data = await Major.create({ label, description })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/majors/:id Update a tag
 * @apiGroup Majors 
 * @apiParam {string} label The major name
 * @apiParam {string} [description] The major description
 * @apiSuccess (200) {object} void The Updated tag
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
majors.post('/:id', protect, async (ctx) => {
  await Routing.basePOST(Major, ctx, async (data) => {
    data = await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  })
})

/** 
 * @api {delete} /api/majors/:id Delete a major 
 * @apiGroup Majors 
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
majors.delete('/:id', protect, async (ctx) => {
  await Routing.baseDELETE(Major, ctx)
})

module.exports = { majors }