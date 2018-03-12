'use strict'

import Router from 'koa-router'

import { Major } from '../models'

const router = Router()

router.get('/', async (ctx, next) => {
  const message = 'Major Query All'

  try {
    const data = await Major.findAll({
      limit: 20
    })
    ctx.status = 200
    ctx.body = { data, message: `${message} Success` }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

router.get('/:id', async (ctx, next) => {
  const message = 'Major Query One'

  try {
    const data = await Major.findOne({ 
      where: { id: ctx.params.id }
    })
    if (data) {
      ctx.status = 200
      ctx.body = { data, message: `${message} Success` }
    } else {
      ctx.throw(404, `${message} Not Found`)
    }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

export default router