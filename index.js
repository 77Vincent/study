const Koa = require('koa')
const convert = require('koa-convert')
const logger = require('koa-logger')
const cors = require('koa-cors')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
// const jwt = require('koa-jwt')

const c = require('./config')
const { Oauth } = require('./utils')
const routes = require('./routes')

const app = new Koa()
app.proxy = true
app.use(convert(logger()))
app.use(convert(cors()))
app.use(convert(bodyParser()))
app.use(serve('./static'))

app.use(async (ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})
app.use(async (ctx, next) => {
  ctx.decoded = {}
  let id = await Oauth.verifyToken(ctx)
  if (id) {
    ctx.decoded = id
  }
  await next()
})

app.use(routes.routes(), routes.allowedMethods())

app.on('error', (error) => {
  throw new Error(`Server Internal Error:${error}`)
})

app.listen(c.port)