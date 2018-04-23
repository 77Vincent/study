import Router from 'koa-router'

import { Class, Course } from '../models'
import { General } from '../utils'
import c from '../config'

export const classes = Router()

/** 
 * @api {get} /api/classes Get all classes
 * @apiGroup Classes 
 * @apiParam (Query String) {boolean} [finished=0,1] Filtered by if the schedule is finished 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all schedules
 */
classes.get('/', async (ctx) => {
  try {
    const filters = ['finished']
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.objToObjGroupsInArr(qs, filters)

    const data = await Class.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter },
      order: [['start', 'ASC']],
      include: [{ model: Course, attributes: ['label', 'description'] }]
    })
    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})
