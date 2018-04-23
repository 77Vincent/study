import Router from 'koa-router'

import { Schedule, Course, Class } from '../models'
import { General } from '../utils'
import c from '../config'

export const schedules = Router()

/** 
 * @api {get} /api/schedules Get all schedules
 * @apiGroup Schedules 
 * @apiParam (Query String) {string} [teacher_id] Filtered by teacher ID
 * @apiParam (Query String) {string} [student_id] Filtered by student ID
 * @apiParam (Query String) {boolean} [finished=0,1] Filtered by if the schedule is finished 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all schedules
 */
schedules.get('/', async (ctx) => {
  try {
    const filters = ['teacher_id', 'student_id', 'finished']
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.objToObjGroupsInArr(qs, filters)

    const data = await Schedule.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter }
    })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/schedules/:id Get a schedule
 * @apiGroup Schedules 
 * @apiSuccess (200) {object} void A schedule
 */
schedules.get('/:id', async (ctx) => {
  try {
    const urls = ['classes']
    const { id } = ctx.params
    const data = await Schedule.findOne({ where: { id } })
    const classes = await Class.findAll({ where: { schedule_id: id } })

    data.dataValues.classes = classes.length
    urls.map(each => {
      data.dataValues[`${each}_url`] = General.getDomain(`/api/schedules/${id}/${each}`)
    })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/schedules/:id/classes Get a schedule's classes
 * @apiGroup Schedules 
 * @apiParam (Query String) {boolean} [finished=0,1] Filtered by if the class is finished 
 * @apiSuccess (200) {object[]} void Array contains a schedule's classes
 */
schedules.get('/:id/classes', async (ctx) => {
  try {
    const { id } = ctx.params
    const filters = ['finished']
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.objToObjGroupsInArr(qs, filters)
    filter.push({ schedule_id: id })

    const data = await Class.findAll({
      where: { $and: filter },
      order: [['start', 'ASC']],
      include: [{ model: Course }]
    })
    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})
