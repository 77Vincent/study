'use strict'

import Koa from 'koa'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'

import routes from './routes'
import { verifyToken } from './utili'

const app = new Koa()

app.proxy = true
app
	.use(convert(cors()))
	.use(convert(logger()))
	.use(bodyParser())
	.use(async (ctx, next) => {
		await next()
		ctx.set('X-Powered-By', 'Koa2')
	})
	.use(async (ctx, next) => {
		ctx.decoded = {}
		let id = await verifyToken(ctx)
		if (id) {
			ctx.decoded = id
		}
		await next()
	})
	.use(routes.routes(), routes.allowedMethods())
	.on('error', (error, ctx) => {
		console.log('server Internal Error:' + error)
	})
	.listen(3001)