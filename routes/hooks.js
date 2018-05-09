const Router = require('koa-router')
const { execSync } = require('child_process')

const { General } = require('../services')

const hooks = Router()

// This route is for the listening the git webhooks for deployment
hooks.post('/', (ctx) => {
  try {

    // For this server
    execSync('git pull', { encoding: 'utf8' })

    // For the webapp
    execSync('git pull; npm run build', { encoding: 'utf8', cwd: '../xfolio-webapp' })

    ctx.status = 200
    ctx.body = `Successfully deployed at ${new Date()}`
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { hooks }