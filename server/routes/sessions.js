'use strict'

import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'
import { signToken } from '../base/oauth'

const Op = Sequelize.Op
const router = Router()

// Login 
router.post('/', async (ctx, next) => {
  const id = ctx.decoded.user_info
  const { username, password } = ctx.request.body
  let user

  // Sign in with user input credentials
  if (username && password) {
    try {
      user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }, { mobilephone: username }],
          password
        }
      })

      if (user) {
        const { token, expiresIn } = signToken(user)

        ctx.cookies.set("user_info", token, {
          overwrite: true,
          maxAge: expiresIn
        })

        ctx.status = 200
        ctx.body = {
          data: user,
          message: 'Login Success'
        }
      } else {
        ctx.status = 403
        ctx.body = {
          message: 'Login Failure'
        }
      }
    } catch (err) {
      console.log('Login Error:', err)
      ctx.status = 500
      ctx.body = {
        message: 'Internal Error: Login error'
      }
    }

  // Sign in with credentials in cookies if exist 
  } else if (id) {
    try {
      user = await User.findOne({ where: { id } })

      ctx.status = 200
      ctx.body = {
        data: user,
        message: 'Login Success'
      }
    } catch (err) {
      console.log('Login Error:', err)
      ctx.status = 500
      ctx.body = {
        message: 'Internal Error: Login Error'
      }
    }

  // Newly visit
  } else {
    ctx.status = 403
    ctx.body = {
      message: 'Login Failure'
    }
  }
})

// Logout 
router.delete('/', async (ctx, next) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = {
      message: 'Logout Success'
    }
  } catch (err) {
    console.log('Logout Error:', err)
    ctx.status = 500
    ctx.body = {
      message: 'Internal Error: Logout Error'
    }
  }
})

export default router