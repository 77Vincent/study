import Router from 'koa-router'
import Sequelize from 'sequelize'
import User from '../models'
import { signToken } from '../base/oauth'

const Op = Sequelize.Op
const router = Router()

const authenticate = async (ctx) => {
  const { username, password } = ctx.request.body

  const student = await Student.findOne({
    where: {
      [Op.or]: [{
        account: username
      }, {
        email: username
      }],
      password: password
    }
  })

  const teacher = await Teacher.findOne({
    where: {
      [Op.or]: [{
        account: username
      }, {
        email: username
      }],
      password: password
    }
  })

  if (student && !teacher) {
    return {
      data: student,
      role: 'student'
    }
  } else if (!student && teacher) {
    return {
      data: teacher,
      role: 'teacher'
    }
  } else if (!student && !teacher) {
    // Authetication failed
    return false
  } else {
    // 老师很学生账号密码相同的情况
  }
}

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