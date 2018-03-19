import Router from 'koa-router'

import { Major } from '../models'
import { fn } from '../utili'

export const majors = Router()

majors.get('/', async (ctx, next) => {
  try {
    const data = await Major.findAll({ limit: 20 })
    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})
