import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'

import routes from './routes'
import { verifyToken } from './utili'

const app = new Koa()

app.proxy = true
app.use(convert(cors()))
app.use(convert(logger()))
app.use(bodyParser())

app.use(async (ctx, next) => {
	await next()
	ctx.set('X-Powered-By', 'Koa2')
})

app.use(async (ctx, next) => {
	ctx.decoded = {}
	let id = await verifyToken(ctx)
	if (id) {
		ctx.decoded = id
	}
	await next()
})

app.use(routes.routes(), routes.allowedMethods())

app.on('error', (error, ctx) => {
	throw new Error('Server Internal Error:' + error)
})

app.listen(3001)