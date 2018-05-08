const Router = require('koa-router')
const { exec } = require('child_process')

const { General } = require('../services')

const hooks = Router()

const action = 'git status'

hooks.post('/', (ctx) => {
  try {
    exec(action, (err) => {
      if (err) { console.error(err) }
    })
    ctx.status = 200
    ctx.body = `Sync successfully! ${new Date()}`

  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { hooks }