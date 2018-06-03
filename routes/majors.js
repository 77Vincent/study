const Router = require('koa-router')

const { Major } = require('../models')
const { General, Auth } = require('../services')

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
 * @apiParam {String} label The major name
 * @apiParam {String} [description] The major description
 * @apiSuccess (201) {Object} void The created major 
 * @apiError {String} 401 Not authenticated, sign in first to get token 
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
 * @apiParam {String} label The major name
 * @apiParam {String} [description] The major description
 * @apiSuccess (200) {Object} void The Updated tag
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
majors.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Major, async (data) => {
    data = await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  })
})

/** 
 * @api {delete} /api/majors/:id Delete a major 
 * @apiGroup Majors 
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
majors.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Major, async (data) => {
    await Major.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { majors }