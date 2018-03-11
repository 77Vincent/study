'use strict'

import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'
import { signToken } from '../utili/oauth'

const Op = Sequelize.Op
const router = Router()

router.post('/', async (ctx, next) => {
  const id = ctx.decoded.user_info
  const { username, password } = ctx.request.body
  let user

  try {
    // Sign in with user input credentials
    if (username && password) {
      user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }, { mobilephone: username }],
          password
        }
      })
    // Sign in with credentials in cookies if exist 
    } else if (id) {
      user = await User.findOne({ where: { id } })
    // Newly visit
    } else {
      ctx.status = 200
      ctx.body = {
        message: 'Newly visit'
      }
      return
    }

    if (user) {
      const { token, expiresIn } = signToken(user)

      ctx.cookies.set("user_info", token, {
        overwrite: true,
        maxAge: expiresIn
      })
      ctx.status = 200
      ctx.body = {
        data: user,
        message: 'Sign In Success'
      }
    } else {
      ctx.status = 403
      ctx.body = {
        message: 'Sign In Failure'
      }
    }
  } catch (err) {
    console.log('Sign In Error:', err)
    ctx.status = 500
    ctx.body = {
      message: 'Internal Error: Sign In error'
    }
  }
})

router.delete('/', async (ctx, next) => {
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = {
      message: 'Sign Out Success'
    }
  } catch (err) {
    console.log('Sign Out Error:', err)
    ctx.status = 500
    ctx.body = {
      message: 'Internal Error: Sign Out Error'
    }
  }
})

export default router