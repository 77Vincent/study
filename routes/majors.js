import Router from 'koa-router'

import { Major } from '../models'
import { General } from '../utils'

export const majors = Router()

/** 
 * @api {get} /api/majors/ Get all majors
 * @apiGroup Majors 
 * @apiSuccess (200) {object[]} void Array contains all majors
 */
majors.get('/', async (ctx) => {
  try {
    const data = await Major.findAll()

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/majors/ Create a major
 * @apiGroup Majors 
 * @apiSuccess (200) {object} void The created major 
 */
majors.put('/', async (ctx) => {
  try {
    const { label, description } = ctx.request.body
    const data = await Major.create({ label, description })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})
