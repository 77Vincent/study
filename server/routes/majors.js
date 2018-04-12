import Router from 'koa-router'

import c from '../config'
import { Major } from '../models'
import { fn } from '../utils'

export const majors = Router()

majors.get('/', async (ctx) => {
  try {
    const data = await Major.findAll({ limit: c.queryLimit })
    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})
