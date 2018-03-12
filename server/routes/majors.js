import Router from 'koa-router'
import { Major } from '../models'

const router = Router()

router.get('/', async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    data: user,
    message: 'Sign In Success'
  }
})

export default router