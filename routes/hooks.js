const Router = require('koa-router')
const { execSync } = require('child_process')

const { General } = require('../services')

const hooks = Router()
const serverOptions = { encoding: 'utf8' }
// const webappOptions = Object.assign(serverOptions, {cwd: '../xfolio-webapp'}) 

// This route is for the listening the git webhooks for deployment
hooks.post('/', (ctx) => {
  try {

    // For this server
    const serverDeployedStart = new Date()
    execSync('git pull', serverOptions)
    execSync('npm install', serverOptions)
    const serverDeployedEnd = new Date()

    // For the webapp
    // const webappDeployedStart = new Date()
    // execSync('git pull', webappOptions)
    // execSync('npm install', webappOptions)
    // execSync('npm run build', webappOptions)
    // const webappDeployedEnd = new Date()

    ctx.status = 200
    ctx.body = {
      deployed_at: {
        server: serverDeployedEnd,
        // webapp: webappDeployedEnd 
      },
      time_consuming: {
        server: `${serverDeployedEnd - serverDeployedStart} ms`,
        // webapp: `${webappDeployedEnd - webappDeployedStart} ms`
      }
    } 
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { hooks }