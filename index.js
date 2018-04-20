import Koa from 'koa'
import logger from 'koa-logger'
import cors from 'koa-cors'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser'

import routes from './routes'
import { oauth } from './utils'
import c from './config'

const app = new Koa()

app.proxy = true
app.use(cors())
app.use(logger())
app.use(bodyParser())
app.use(serve('./static'))

app.use(async (ctx, next) => {
  await next()
  ctx.set('X-Powered-By', 'Koa2')
})
app.use(async (ctx, next) => {
  ctx.decoded = {}
  let id = await oauth.verifyToken(ctx)
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