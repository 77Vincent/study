const Router = require('koa-router')

const { Schedule, Class } = require('../models')
const { General } = require('../services')
const c = require('../config')

const schedules = Router()

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
 */
schedules.get('/', async (ctx) => {
  try {
    const filters = ['teacher_id', 'student_id', 'finished']
    const qs = General.parseQuerystring(ctx.request.querystring)

    const data = await Schedule.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: General.getFilter(qs, filters) }
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
 */
schedules.put('/', async (ctx) => {
  try {
    const isOutRange = General.checkRange(range, ctx.request.body)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange

    } else {
      const data = await Schedule.create(ctx.request.body)
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
 */
schedules.post('/:id', async (ctx) => {
  try {
    const isOutRange = General.checkRange(range, ctx.request.body)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange

    } else {
      let data = await Schedule.findOne({ where: { id: ctx.params.id } })
      data = await data.update(ctx.request.body)
      ctx.status = 200
      ctx.body = General.prettyJSON(data)
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/schedules/:id Delete a schedule
 * @apiGroup Schedules
 * @apiSuccess (200) {void} void void
 */
schedules.delete('/:id', async (ctx) => {
  try {
    await Schedule.destroy({ where: { id: ctx.params.id } })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { schedules }