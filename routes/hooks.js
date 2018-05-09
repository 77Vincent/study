const Router = require('koa-router')
const { exec } = require('child_process')

const { General } = require('../services')

const hooks = Router()

// This route is for the listening the git webhooks for deployment
hooks.post('/', (ctx) => {
  try {

    // For this server
    exec('git pull', (err) => {
      if (err) { return }
      exec('npm install')
    })

    ctx.status = 200
    ctx.body = `Successfully deployed at ${new Date()}` 
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { hooks }