'use strict'

import Router from 'koa-router'

import { Major } from '../models'
import { prettyJSON } from '../utili'

const router = Router()

router.get('/', async (ctx, next) => {
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

router.get('/:id', async (ctx, next) => {
  try {
    const data = await Major.findOne({ 
      where: { id: ctx.params.id }
    })
    if (data) {
      ctx.status = 200
      ctx.body = prettyJSON(data) 
    } else {
      ctx.status = 404 
      ctx.body = { message: 'Not Found' }
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

export default router