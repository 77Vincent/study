import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'
import { signToken } from '../base/oauth'

const Op = Sequelize.Op
const router = Router()

const getUser = async (username, password) => {
  let user = await User.findOne({
    where: {
      [Op.or]: [{ 
        username 
      }, { 
        email: username 
      }, {
        mobilephone: username 
      }],
      password
    }
  })

  return user
}

// Login 
router.post('/', async (ctx, next) => {
  const id = ctx.decoded.user_info
  const { username, password } = ctx.request.body
  let user

  // Sign in with user input credentials
  if (username && password) {
    try {
      user = await getUser(username, password)

      if (user) {
        const { token, expiresIn } = signToken(user)

        ctx.cookies.set("user_info", token, {
          overwrite: true,
          maxAge: expiresIn
        })

        ctx.status = 200
        ctx.body = {
          data: user,
          code: 200,
          message: 'Success'
        }
      } else {
        ctx.status = 403
        ctx.body = {
          code: 403,
          message: 'Failure'
        }
      }
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: 'Internal Error'
      }
    }

  // Sign in with credentials in cookies if exist 
  } else if (id) {
    try {
      user = await User.findOne({ where: { id } })

      ctx.status = 200
      ctx.body = {
        data: user,
        code: 200,
        message: 'Success'
      }
    } catch (err) {
      ctx.status = 500
      ctx.body = {
        code: 500,
        message: 'Internal Error'
      }
    }

  // Newly visit
  } else {
    ctx.status = 403
    ctx.body = {
      data: user,
      code: 403,
      message: 'Failure'
    }
  }
})

// Logout 
router.delete('/', async (ctx, next) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = {
      code: 200,
      message: 'Success'
    }
  } catch (err) {
    console.log('logout error', err)
    ctx.status = 500
    ctx.body = {
      code: 500,
      message: 'Internal Error'
    }
  }
})

export default router