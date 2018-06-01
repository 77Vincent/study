const Router = require('koa-router')

const { Schedule, Class } = require('../models')
const { General, Auth } = require('../services')
const config = require('../config')

const schedules = Router()
const { protect } = Auth
const range = {
  quota: 99
}

/** 
 * @api {get} /api/schedules Get all schedules
 * @apiGroup Schedules 
 * @apiParam (Query String) {string} [teacher_id] Filtered by teacher ID
 * @apiParam (Query String) {string} [student_id] Filtered by student ID
 * @apiParam (Query String) {boolean=0,1} [finished=0,1] Filtered by if the schedule is finished 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all schedules
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
schedules.get('/', protect, async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const data = await Schedule.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(qs.page, config.queryLimit),
      where: { $and: General.getFilter(qs, ['teacher_id', 'student_id', 'finished']) }
    })

    for (let i = 0; i < data.length; i++) {
      const current = data[i].dataValues
      const { id } = current
      const classes = await Class.findAll({ where: { schedule_id: id } })
      current.classes = classes.length
      current.classes_url = General.getDomain(`/api/classes?schedule_id=${id}`) 
    }

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/schedules Create a schedule
 * @apiGroup Schedules 
 * @apiParam {string} [label] The schedule name
 * @apiParam {integer} teacher_id The teacher user ID
 * @apiParam {integer} student_id The student user ID
 * @apiParam {boolean=0,1} [finished=0] If the schedule is finished or not
 * @apiParam {integer} quota=1 The length of the schedule
 * @apiSuccess (201) {object} void The created schedule 
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
schedules.put('/', protect, async (ctx) => {
  try {
    const isOutRange = General.checkRange(range, ctx.request.body)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange
    } else {
      const { label, quota, finished, student_id } = ctx.request.body
      const teacher_id = ctx.state.currentUserID
      const data = await Schedule.create({ label, quota, finished, student_id, teacher_id})
      ctx.body = General.prettyJSON(data)
      ctx.status = 201
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/schedules/:id Update a schedule
 * @apiGroup Schedules 
 * @apiParam {string} [label] The schedule name
 * @apiParam {integer} teacher_id The teacher user ID
 * @apiParam {integer} student_id The student user ID
 * @apiParam {boolean=0,1} [finished=0] If the schedule is finished or not
 * @apiParam {integer} quota=1 The length of the schedule
 * @apiSuccess (200) {object} void The updated schedule 
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
schedules.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Schedule, async (data) => {
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
})

/** 
 * @api {delete} /api/schedules/:id Delete a schedule
 * @apiGroup Schedules
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
schedules.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Schedule, async (data) => {
    await Schedule.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { schedules }