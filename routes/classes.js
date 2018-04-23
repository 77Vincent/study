import Router from 'koa-router'

import { Class, Course } from '../models'
import { General } from '../utils'
import c from '../config'

export const classes = Router()

/** 
 * @api {get} /api/classes Get all classes
 * @apiGroup Classes 
 * @apiParam (Query String) {boolean=0,1} [finished=0,1] Filtered by if the schedule is finished 
 * @apiParam (Query String) {string=ASC,DESC} [start=ASC] Ordered by start time of the class 
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
 * @apiDescription The property "finished" is set to false by default
 * @apiParam {date} start Class start time 
 * @apiParam {date} [end] Class end time 
 * @apiParam {double} length Duration of the class in hours 
 * @apiParam {boolean=0,1} [finished=0] Duration of the class in hours 
 * @apiParam {integer} schedule_id Which schedule does this class belong to
 * @apiParamExample {json} Request-example:
 *  {
 *    "start": new Date(),
 *    "end": new Date('2018/05/01'),
 *    "length": 2.5,
 *    "finished": 0,
 *    "schedule_id": 3 
 *  }
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

/** 
 * @api {post} /api/classes/:id Update a class
 * @apiGroup Classes 
 * @apiParam {date} start Class start time 
 * @apiParam {date} end Class end time 
 * @apiParam {double} length Duration of the class in hours 
 * @apiParam {boolean=0,1} finished Is the class finished or not
 * @apiParamExample {json} Request-example:
 *  {
 *    "start": new Date(),
 *    "end": new Date('2018/05/01'),
 *    "length": 2.5,
 *    "finished": 0
 *  }
 * @apiSuccess (200) {object} void The updated class
 */
classes.post('/:id', async (ctx) => {
  try {
    const { start, end, length, finished } = ctx.request.body
    let data = await Class.findOne({
      where: { id: ctx.params.id }
    })
    data = await data.update({ start, end, length, finished })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/classes/:id Delete a class
 * @apiGroup Classes 
 * @apiSuccess (200) {void} void void
 */
classes.delete('/:id', async (ctx) => {
  try {
    await Class.destroy({ where: { id: ctx.params.id } })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})
