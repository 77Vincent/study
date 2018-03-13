'use strict'

import Koa from 'koa'
import http from 'http'
import convert from 'koa-convert'
import logger from 'koa-logger'
import cors from 'koa-cors' //跨域
import bodyParser from 'koa-bodyparser' //请求体JSON解析
import resource from 'koa-static' //静态资源托管
import path from 'path'

import routes from './routes'
import { verifyToken } from './utili'

const app = new Koa()

app.proxy = true

app
	.use(convert(cors()))
	.use(convert(logger()))
	.use(bodyParser())
	.use(resource(path.join(__dirname, '../public')))
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

export default app