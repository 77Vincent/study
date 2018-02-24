import Router from 'koa-router'
const router = Router()
import { signToken } from '../oauth/index'
import { register, checkPassword, getUserInfo } from './userHandler'

router.get('/verify', async (ctx, next) => {
  try {
    if (ctx.decoded.user_id) {
      let user_info = await getUserInfo(ctx.decoded.user_id, ctx.decoded.is_student)
      ctx.status = 200
      ctx.body = {
        code: 200,
        data: user_info,
        is_student: ctx.decoded.is_student === "student"
      }
    } else {
      ctx.status = 403
      ctx.body = {
        code: 403,
        message: "forbidden"
      }
    }
  } catch (err) {
    console.log('verify user', err)
    ctx.status = 500,
      ctx.body = {
        code: 500,
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

router.post('/login', async (ctx, next) => {
  try {
    let user = await checkPassword(ctx)

    if (user) {
      let { token, expiresIn } = signToken(user)

      ctx.cookies.set("user_info", token, {
        overwrite: true,
        maxAge: expiresIn
      })
      ctx.status = 200
      ctx.body = {
        data: user,
        message: 'login in success'
      }
    } else {
      ctx.status = 403
      ctx.body = {
        message: 'password wrong'
      }
    }
  } catch (err) {
    ctx.status = 500
    ctx.body = {
      message: 'Internal Server Error'
    }
    console.log('login failure', err)
  }
})

router.get('/logout', async (ctx, next) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = {
      code: 200,
      message: 'logout success'
    }
  } catch (err) {
    console.log('logout error', err)
    ctx.status = 500
    ctx.body = {
      code: 200,
      message: 'Internal Server Error'
    }
  }

})
export default router