'use strict'

import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'

const Op = Sequelize.Op
const router = Router()

router.post('/', async (ctx, next) => {
  console.log(ctx.request.body)
  try {
    await User.create(ctx.request.body)
    ctx.status = 200
    ctx.body = {
      message: 'User Creation Success'
    }
  } catch (err) {
    console.log('User Creation Error', err)
    ctx.status = 500
    ctx.body = {
      message: 'Internal Error: User Creation Error'
    }
  }
})

router.delete('/', async (ctx, next) => {
  const id = ctx.decoded.user_info
  try {
    await User.destroy({ where: { id } })
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