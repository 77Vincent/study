const Router = require('koa-router')

const { Class, Course } = require('../models')
const { General, Auth } = require('../services')
const c = require('../config')

const classes = Router()
const { protect } = Auth
const range = { length: 99 }

/** 
 * @api {get} /api/classes Get all classes
 * @apiGroup Classes 
 * @apiDescription Class is ordered by date in ASC order by default
 * @apiParam (Query String) {boolean=0,1} [finished=0,1] Filtered by if the class is finished 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all classes 
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 */
classes.get('/', protect, async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)

    const data = await Class.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: General.getFilter(qs, ['finished', 'schedule_id']) },
      order: [['date', 'ASC']],
      include: [{ model: Course, attributes: ['label', 'description'] }]
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data) 
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/classes Create a class
 * @apiGroup Classes 
 * @apiDescription The property "finished" is set to false by default
 * @apiParam {date} [date] On which date the class will begin
 * @apiParam {double} length=1 Duration of the class in hours 
 * @apiParam {boolean=0,1} finished=0 If the class is finished or not 
 * @apiParam {integer} schedule_id Which schedule does this class belong to
 * @apiSuccess (201) {object} void The created class
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 416 Range not satisfiable
 */
classes.put('/', protect, async (ctx) => {
  try {
    const isOutRange = General.checkRange(range, ctx.request.body)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange

    } else {
      const { date, length, finished, schedule_id} = ctx.request.body
      const user_id = ctx.state.currentUserID
      const data = await Class.create({ date, length, finished, schedule_id, user_id })
      ctx.body = General.prettyJSON(data)
      ctx.status = 201
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/classes/:id Update a class
 * @apiGroup Classes 
 * @apiParam {date} [date] On which date the class will begin
 * @apiParam {double} length=1 Duration of the class in hours 
 * @apiParam {boolean=0,1} finished=0 If the class is finished or not 
 * @apiParam {integer} schedule_id Which schedule does this class belong to
 * @apiSuccess (200) {object} void The updated class
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 * @apiError {string} 416 Range not satisfiable
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
      ctx.body = General.prettyJSON(data)
    })
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/classes/:id Delete a class
 * @apiGroup Classes 
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
classes.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Class, async (data) => {
    await Class.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { classes }