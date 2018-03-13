import Router from 'koa-router'

import { User } from '../models'
import { prettyJSON } from '../utili'

const router = Router()

router.get('/', async (ctx, next) => {
  try {
    const data = await User.findAll({
      limit: 20
    })
    ctx.status = 200
    ctx.body = prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

router.get('/:param', async (ctx, next) => {
  try {
    const data = await User.findOne({ 
      where: { username: ctx.params.param }
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

router.post('/', async (ctx, next) => {
  try {
    await User.create(ctx.request.body)
    ctx.status = 201
    ctx.body = prettyJSON({ message: `Success` })
  } catch (err) {
    ctx.throw(500, err)
  }
})

router.delete('/', async (ctx, next) => {
  try {
    await User.destroy({ where: { id: ctx.decoded.user_info } })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = prettyJSON({ message: `Success` })
  } catch (err) {
    ctx.throw(500, err)
  }
})

export default router