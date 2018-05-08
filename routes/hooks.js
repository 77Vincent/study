const Router = require('koa-router')

const { General } = require('../services')

const hooks = Router()

hooks.post('/', (ctx) => {
  try {
    ctx.status = 200
    ctx.body = 1111111

  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { hooks }