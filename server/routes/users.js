'use strict'

import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'

const Op = Sequelize.Op
const router = Router()

router.get('/', async (ctx, next) => {
  const message = 'User Query All'

  try {
    const data = await User.findAll({
      limit: 20
    })
    ctx.status = 200
    ctx.body = { data, message: `${message} Success` }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

router.get('/:id', async (ctx, next) => {
  const message = 'User Query One'

  try {
    const data = await User.findOne({ 
      where: { id: ctx.params.id }
    })
    if (data) {
      ctx.status = 200
      ctx.body = { data, message: `${message} Success` }
    } else {
      ctx.throw(404, `${message} Not Found`)
    }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

router.post('/', async (ctx, next) => {
  const message = 'User Creation'

  try {
    await User.create(ctx.request.body)
    ctx.status = 200
    ctx.body = { message: `${message} Success` }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

router.delete('/', async (ctx, next) => {
  const message = 'User Deletion'

  try {
    await User.destroy({ where: { id: ctx.decoded.user_info } })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = { message: `${message} Success` }
  } catch (err) {
    ctx.throw(500, `${message} Error: ${err}`)
  }
})

export default router