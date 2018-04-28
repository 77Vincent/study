import Router from 'koa-router'

import { Class, Course } from '../models'
import { General } from '../utils'
import c from '../config'

export const classes = Router()

const params = ['start', 'end', 'length', 'finished', 'schedule_id']
const range = {
  length: 99
}

/** 
 * @api {get} /api/classes Get all classes
 * @apiGroup Classes 
 * @apiParam (Query String) {boolean=0,1} [finished=0,1] Filtered by if the class is finished 
 * @apiParam (Query String) {string=ASC,DESC} [start=ASC] Ordered by start time of the class 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all classes 
 */
classes.get('/', async (ctx) => {
  try {
    const filters = ['finished', 'schedule_id']

    const qs = General.parseQuerystring(ctx.request.querystring)

    let sorting = [['start', 'ASC']]
    for (let key in qs) {
      // ASC as default order
      if (['start'].indexOf(key) !== -1) {
        qs[key] = qs[key] === 'DESC' ? 'DESC' : 'ASC'
        sorting.splice(0, 0, [key, qs[key]])
      }
    }

    const data = await Class.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: General.objToObjGroupsInArr(qs, filters) },
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
 * @apiParam {date} [start] Class start time 
 * @apiParam {date} [end] Class end time 
 * @apiParam {double} length=1 Duration of the class in hours 
 * @apiParam {boolean=0,1} finished=0 If the class is finished or not 
 * @apiParam {integer} schedule_id Which schedule does this class belong to
 * @apiParamExample {json} Request-example:
 *  {
 *    "start": new Date(),
 *    "end": new Date('2018/05/01'),
 *    "length": 2.5,
 *    "finished": 0,
 *    "schedule_id": 3 
 *  }
 * @apiSuccess (201) {object} void The created class
 */
classes.put('/', async (ctx) => {
  try {
    const input = General.batchExtractObj(ctx.request.body, params)
    const isOutRange = General.checkRange(range, input)

    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange

    } else {
      const data = await Class.create(input)
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
 * @apiParam {date} [start] Class start time 
 * @apiParam {date} [end] Class end time 
 * @apiParam {double} length=1 Duration of the class in hours 
 * @apiParam {boolean=0,1} finished=0 If the class is finished or not 
 * @apiParam {integer} schedule_id Which schedule does this class belong to
 * @apiParamExample {json} Request-example:
 *  {
 *    "start": new Date(),
 *    "end": new Date('2018/05/01'),
 *    "length": 2.5,
 *    "finished": 0,
 *    "schedule_id": 3 
 *  }
 * @apiSuccess (200) {object} void The updated class
 */
classes.post('/:id', async (ctx) => {
  try {
    const input = General.batchExtractObj(ctx.request.body, params) 
    const isOutRange = General.checkRange(range, input)
    
    if (isOutRange) {
      ctx.status = 416
      ctx.body = isOutRange

    } else {
      let data = await Class.findOne({ where: { id: ctx.params.id } })
      data = await data.update(input)
      ctx.status = 200
      ctx.body = General.prettyJSON(data) 
    }

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
