import Router from 'koa-router'
import { authenticate, getUser } from './handler'
import { signToken } from '../oauth/index'

const router = Router()

// Login 
router.post('/', async (ctx, next) => {
  const cookies = ctx.decoded
  const { username, password } = ctx.request.body
  let user

  // Sign in with user input credentials
  if (username && password) {
    try {
      user = await authenticate(ctx)

      if (user) {
        const { token, expiresIn } = signToken(user)

        ctx.cookies.set("user_info", token, {
          overwrite: true,
          maxAge: expiresIn
        })

        ctx.status = 200
        ctx.statusText = 'Login Success'
        ctx.body = user
      } else {
        ctx.status = 403
        ctx.statusText = 'Login Failed'
      }
    } catch (err) {
      ctx.status = 500
      ctx.statusText = 'Internal Server Error'
      console.log('login failure', err)
    }

  // Sign in with credentials in cookies if exist 
  } else if (cookies.user_id) {
    user = await getUser(cookies.user_id, cookies.is_student)

    ctx.status = 200
    ctx.statusText = 'Login Success'
    ctx.body = user
  }
})

// Logout 
router.delete('/', async (ctx, next) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.statusText = 'Logout Success'
  } catch (err) {
    console.log('logout error', err)
    ctx.status = 500
    ctx.statusText = 'Internal Server Error'
  }
})

export default router