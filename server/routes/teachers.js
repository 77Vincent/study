import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User } from '../models'
import { prettyJSON } from '../utili'
import { configRouter } from '../config'

const Op = Sequelize.Op
export const teachers = Router()

teachers.get('/', async (ctx, next) => {
  try {
    let data = await User.findAll({
      limit: configRouter.limit,
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
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})

teachers.get('/:username', async (ctx, next) => {
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
    }
  } catch (err) {
    ctx.throw(500, err)
  }
})
