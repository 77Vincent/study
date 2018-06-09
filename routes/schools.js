const Router = require('koa-router')

const { School } = require('../models')
const { General, Auth } = require('../services')

const schools = Router()
const { protect } = Auth

/** 
 * @api {get} /api/schools/ Get all schools
 * @apiGroup Schools 
 * @apiSuccess (200) {object[]} void Array contains all schools
 */
schools.get('/', async (ctx) => {
  try {
    const data = await School.findAll()

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/schools/ Create a school
 * @apiGroup Schools 
 * @apiParam {String} en The school's English name
 * @apiParam {String} cn The school's Chinese name
 * @apiSuccess (201) {Object} void The created school 
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 */
schools.put('/', protect, async (ctx) => {
  try {
    const { en, cn } = ctx.request.body
    const data = await School.create({ en, cn })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/schools/:id Update a tag
 * @apiGroup Schools 
 * @apiParam {String} en The school's English name
 * @apiParam {String} cn The school's Chinese name
 * @apiSuccess (200) {Object} void The Updated tag
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
schools.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, School, async (data) => {
    data = await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  })
})

/** 
 * @api {delete} /api/schools/:id Delete a school 
 * @apiGroup Schools 
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
schools.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, School, async (data) => {
    await School.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { schools }