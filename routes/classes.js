const Router = require('koa-router')

const { Class, Course } = require('../models')
const { General, Auth, Filter } = require('../services')
const config = require('../config')

const classes = Router()
const { protect } = Auth
const range = { length: 99 }

/** 
 * @api {get} /api/classes Get all classes
 * @apiGroup Classes 
 * @apiParam (Query String) {Boolean=0,1} [finished=0,1] Filtered by if the class is finished 
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all classes 
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 */
classes.get('/', async (ctx) => {
  try {
    const query = General.parseQuerystring(ctx.request.querystring)

    const data = await Class.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      where: new Filter(query).filterBy(['finished', 'schedule_id']).done(),
      include: [{ model: Course, attributes: ['label', 'description'] }]
    })

    ctx.status = 200
    ctx.body = data 
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/classes Create a class
 * @apiGroup Classes 
 * @apiDescription The property "finished" is set to false by default
 * @apiParam {Date} [date] On which date the class will begin
 * @apiParam {Number} length=1 Duration of the class in hours 
 * @apiParam {Boolean=0,1} finished=0 If the class is finished or not 
 * @apiParam {Integer} schedule_id Which schedule does this class belong to
 * @apiSuccess (201) {Object} void The created class
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 416 Range not satisfiable
 */
classes.put('/', protect, async (ctx) => {
  try {
    const isOutRange = General.checkRange(range, ctx.request.body)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange

    } else {
      const { date, length, finished, schedule_id } = ctx.request.body
      const user_id = ctx.state.currentUserID
      const data = await Class.create({ date, length, finished, schedule_id, user_id })
      ctx.body = data
      ctx.status = 201
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/classes/:id Update a class
 * @apiGroup Classes 
 * @apiParam {Date} [date] On which date the class will begin
 * @apiParam {Number} length=1 Duration of the class in hours 
 * @apiParam {Boolean=0,1} finished=0 If the class is finished or not 
 * @apiParam {Integer} schedule_id Which schedule does this class belong to
 * @apiSuccess (200) {Object} void The updated class
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 * @apiError {String} 416 Range not satisfiable
 */
classes.post('/:id', protect, async (ctx) => {
  try {
    await Auth.isAuthorized(ctx, Class, async (data) => {
      const isOutRange = General.checkRange(range, ctx.request.body)
      if (isOutRange) {
        ctx.status = 416
        ctx.body = isOutRange
        return
      }
      data = await data.update(ctx.request.body)
      ctx.status = 200
      ctx.body = data
    })
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/classes/:id Delete a class
 * @apiGroup Classes 
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
classes.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Class, async (data) => {
    await Class.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { classes }