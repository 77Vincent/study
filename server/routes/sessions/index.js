import Router from 'koa-router'
const router = Router()
import { authenticate, getUser } from './handler'
import { signToken } from '../oauth/index'

// Login 
router.post('/', async (ctx, next) => {
  const cookies = ctx.decoded
  let user

  // Sign in with user input credentials
  if (Object.keys(ctx.request.body).length) {
    try {
      user = await authenticate(ctx)

      if (user) {
        const { token, expiresIn } = signToken(user)

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
  } else if (cookies.user_id) {
    // Sign in with credentials in cookies if exist 
    user = await getUser(cookies.user_id, cookies.is_student)

    ctx.status = 200
    ctx.body = {
      data: user,
      message: 'login in success',
      is_student: ctx.decoded.is_student === "student"
    }
  }
})

// Logout 
router.delete('/', async (ctx, next) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = {
      message: 'logout success'
    }
  } catch (err) {
    console.log('logout error', err)
    ctx.status = 500
    ctx.body = {
      message: 'Internal Server Error'
    }
  }
})

export default router