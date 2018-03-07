import Router from 'koa-router'
import Sequelize from 'sequelize'

import { Users } from '../models'

const router = Router()
const Op = Sequelize.Op

const register = async (ctx) => {
  try {
    let { userInfo } = ctx.request.body

    if(userInfo.type === "student"){
      await Student.create(userInfo)
    } else {
      await Teacher.create(userInfo)
    }

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const remove = async (ctx) => {
}

router.post('/register', async (ctx, next) => {
  let result = await register(ctx)

  if (result) {
    ctx.status = 200
    ctx.body = {
      data: result,
      message: 'create user success'
    }
  } else {
    ctx.status = 500
  }
})

router.post('/remove', async (ctx, next) => {
})

export default router