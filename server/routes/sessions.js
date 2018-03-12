'use strict'

import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'
import { signToken } from '../utili/oauth'

const Op = Sequelize.Op
const router = Router()

router.post('/', async (ctx, next) => {
  const message = 'Sign In'
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
        message: `${message} Success` 
      }
    } else {
      ctx.throw(403, `${message} Failure`)
    }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

router.delete('/', async (ctx, next) => {
  const message = 'Sign Out'
  try {
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = {
      message: `${message} Success` 
    }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

export default router