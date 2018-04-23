import Router from 'koa-router'

import { Class, Course } from '../models'
import { General } from '../utils'
import c from '../config'

export const classes = Router()

/** 
 * @api {get} /api/classes Get all classes
 * @apiGroup Classes 
 * @apiDescription A class belongs to a schedule, which contains several courses
 * @apiParam (Query String) {boolean} [finished=0,1] Filtered by if the schedule is finished 
 * @apiParam (Query String) {string} [start=ASC] Ordered by start time of the class 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all schedules
 */
classes.get('/', async (ctx) => {
  try {
    const sortings = ['start']
    const filters = ['finished', 'schedule_id']

    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.objToObjGroupsInArr(qs, filters)

    let sorting = [['start', 'ASC']]
    for (let key in qs) {
      // ASC as default order
      if (sortings.indexOf(key) !== -1) {
        qs[key] = qs[key] === 'DESC' ? 'DESC' : 'ASC'
        sorting.splice(0, 0, [key, qs[key]])
      }
    }

    const data = await Class.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter },
      order: sorting,
      include: [{ model: Course, attributes: ['label', 'description'] }]
    })
    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/classes Create a class
 * @apiGroup Classes 
 * @apiParam {date} start Class start time 
 * @apiParam {date} end Class end time 
 * @apiParam {double} length Duration of the class in hours 
 * @apiParam {integer} schedule_id Which schedule this class belongs to
 * @apiSuccess (200) {object} void The created class
 */
classes.put('/', async (ctx) => {
  try {
    const { start, end, length, schedule_id } = ctx.request.body
    const data = await Class.create({ start, end, length, schedule_id })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})
