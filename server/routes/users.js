'use strict'

import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'

const Op = Sequelize.Op
const router = Router()

router.get('/', async (ctx, next) => {
  const message = 'User Query All'
  const users = await User.findAll({
    limit: 20
  })
  try {
    ctx.status = 200
    ctx.body = {
      data: users,
      message: `${message} Success`
    }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

router.get('/:id', async (ctx, next) => {
  const message = 'User Query One'
  console.log(Math.random())
  console.log(ctx.request)
  // const users = await User.findOne({
  //   where: {id}
  // })
  // try {
  //   ctx.status = 200
  //   ctx.body = {
  //     data: users,
  //     message: `${message} Success`
  //   }
  // } catch (err) {
  //   console.log(`${message} Error`, err)
  //   ctx.status = 500
  //   ctx.body = {
  //     message: `Internal Error: ${message} Error`
  //   }
  // }
})

router.post('/', async (ctx, next) => {
  const message = 'User Creation'
  try {
    await User.create(ctx.request.body)
    ctx.status = 200
    ctx.body = {
      message: `${message} Success`
    }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

router.delete('/', async (ctx, next) => {
  const message = 'User Deletion'
  const id = ctx.decoded.user_info
  try {
    await User.destroy({ where: { id } })
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