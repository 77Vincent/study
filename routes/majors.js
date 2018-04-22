import Router from 'koa-router'

import { Major } from '../models'
import { fn } from '../utils'

export const majors = Router()

/** 
 * @api {get} /api/majors/ Get all majors
 * @apiGroup Majors 
 * @apiSuccess (200) {object[]} void Array contains all majors
 */
majors.get('/', async (ctx) => {
  try {
    const data = await Major.findAll()

    fn.simpleSend(ctx, data)
  } catch (err) {
    fn.logError(ctx, err)
  }
})
