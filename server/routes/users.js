import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User, Major } from '../models'
import { prettyJSON } from '../utili'

const Op = Sequelize.Op
const router = Router()

router.get('/', async (ctx, next) => {
  try {
    let data = await User.findAll({
      // include: [{
      //   model: Major
      // }],
      limit: 20
    })
    if (data) {
      data = data.map(item => {
        // Do not show password to client
        delete item.dataValues.password 
        return item
      })
      ctx.status = 200
      ctx.body = prettyJSON(data)
    } else {
      ctx.status = 404
      ctx.body = prettyJSON({ message: 'Not Found' })
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

router.get('/teachers', async (ctx, next) => {
  try {
    let data = await User.findAll({
      limit: 20,
      where: { role: 'teacher' }
    })
    if (data) {
      data = data.map(item => {
        // Do not show password to client
        delete item.dataValues.password 
        return item
      })
      ctx.status = 200
      ctx.body = prettyJSON(data)
    } else {
      ctx.status = 404
      ctx.body = prettyJSON({ message: 'Not Found' })
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

router.get('/:username', async (ctx, next) => {
  try {
    const data = await User.findOne({ 
      where: { username: ctx.params.username }
    })
    if (data) {
      // Do not show password to client
      delete data.dataValues.password
      ctx.status = 200
      ctx.body = prettyJSON(data) 
    } else {
      ctx.status = 404
      ctx.body = prettyJSON({ message: 'Not Found' })
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

router.get('/teachers/:username', async (ctx, next) => {
  try {
    const data = await User.findOne({ 
      where: {
        [Op.and]: [
          { role: 'teacher' },
          { username: ctx.params.username }
        ],
      }
    })
    if (data) {
      // Do not show password to client
      delete data.dataValues.password
      ctx.status = 200
      ctx.body = prettyJSON(data) 
    } else {
      ctx.status = 404
      ctx.body = prettyJSON({ message: 'Not Found' })
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

router.post('/', async (ctx, next) => {
  try {
    await User.create(ctx.request.body)
    ctx.status = 201
    ctx.body = prettyJSON({ message: `Success` })
  } catch (err) {
    ctx.throw(500, err)
  }
})

router.delete('/', async (ctx, next) => {
  try {
    await User.destroy({ where: { id: ctx.decoded.user_info } })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
    ctx.body = prettyJSON({ message: `Success` })
  } catch (err) {
    ctx.throw(500, err)
  }
})

export default router