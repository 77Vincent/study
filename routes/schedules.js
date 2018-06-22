const Router = require('koa-router')
const querystring = require('querystring')

const { Schedule, Class } = require('../models')
const { General, Auth, sequelizeWhere } = require('../services')
const config = require('../config')

const schedules = Router()
const { protect } = Auth
const range = {
  quota: 99,
}

/**
 * @api {get} /api/schedules Get all schedules
 * @apiGroup Schedules
 * @apiParam (Query String) {String} [teacher_id] Filtered by teacher ID
 * @apiParam (Query String) {String} [student_id] Filtered by student ID
 * @apiParam (Query String) {Boolean=0,1} [finished=0,1] Filtered by if the schedule is finished
 * @apiParam (Query String) {String} [search] Search by label
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all schedules
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
schedules.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await Schedule.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      where: sequelizeWhere(ctx.request.querystring, {
        filterBy: ['teacher_id', 'student_id', 'finished'],
        searchBy: ['label'],
      }),
    })

    for (let i = 0; i < data.length; i += 1) {
      const current = data[i].dataValues
      const { id } = current
      const classes = await Class.findAll({ where: { schedule_id: id } })
      current.classes = classes.length
      current.classes_url = General.getDomain(`/api/classes?schedule_id=${id}`)
    }

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/schedules Create a schedule
 * @apiGroup Schedules
 * @apiParam {String} [label] The schedule name
 * @apiParam {Integer} teacher_id The teacher user ID
 * @apiParam {Integer} student_id The student user ID
 * @apiParam {Boolean=0,1} [finished=0] If the schedule is finished or not
 * @apiParam {Integer} quota=1 The length of the schedule
 * @apiSuccess (201) {Object} void The created schedule
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
schedules.put('/', protect, async (ctx) => {
  try {
    const isOutRange = General.checkRange(range, ctx.request.body)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange
    } else {
      const {
        label, quota, finished, student_id,
      } = ctx.request.body
      const teacher_id = ctx.state.currentUserID
      const data = await Schedule.create({
        label, quota, finished, student_id, teacher_id,
      })
      ctx.body = data
      ctx.status = 201
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/schedules/:id Update a schedule
 * @apiGroup Schedules
 * @apiParam {String} [label] The schedule name
 * @apiParam {Integer} teacher_id The teacher user ID
 * @apiParam {Integer} student_id The student user ID
 * @apiParam {Boolean=0,1} [finished=0] If the schedule is finished or not
 * @apiParam {Integer} quota=1 The length of the schedule
 * @apiSuccess (200) {Object} void The updated schedule
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
schedules.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Schedule, async (current) => {
    const isOutRange = General.checkRange(range, ctx.request.body)
    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange
      return
    }
    const data = await current.update(ctx.request.body)
    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/schedules/:id Delete a schedule
 * @apiGroup Schedules
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
schedules.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Schedule, async (data) => {
    await Schedule.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { schedules }
