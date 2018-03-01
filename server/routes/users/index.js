import Router from 'koa-router'
const router = Router()
import { signToken } from '../oauth/index'
import { register, checkPassword, getUserInfo } from './userHandler'

router.get('/verify', async (ctx, next) => {
  try {
    if (ctx.decoded.user_id) {
      const user_info = await getUserInfo(ctx.decoded.user_id, ctx.decoded.is_student)

      ctx.status = 200
      ctx.body = {
        data: user_info,
        is_student: ctx.decoded.is_student === "student"
      }
    } else {
      ctx.status = 403
      ctx.body = {
        message: "forbidden"
      }
    }
  } catch (err) {
    console.log('verify user', err)
    ctx.status = 500,
      ctx.body = {
        message: 'Internal Server Error'
      }
  }
})

router.post('/register', async (ctx, next) => {
  let result = await register(ctx)

  if (result) {
    ctx.status = 200
    ctx.body = {
      data: result,
      message: 'create user success'
    }
  } else {
    ctx.status = 500
  }
})

export default router