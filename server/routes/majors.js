import Router from 'koa-router'

import { Major } from '../models'
import { prettyJSON } from '../utili'

export const majors = Router()

majors.get('/', async (ctx, next) => {
  try {
    const data = await Major.findAll({
      limit: 20
    })
    ctx.status = 200
    ctx.body = prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

majors.get('/:param', async (ctx, next) => {
  try {
    const data = await Major.findOne({ 
      where: { label: ctx.params.param }
    })
    if (data) {
      ctx.status = 200
      ctx.body = prettyJSON(data) 
    } else {
      ctx.status = 404 
      ctx.body = prettyJSON({ message: 'Not Found' })
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})
