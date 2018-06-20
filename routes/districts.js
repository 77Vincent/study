const Router = require('koa-router')
const request = require('request-promise-native')
const querystring = require('querystring')

const { General } = require('../services')
const config = require('../config')

const districts = Router()
const URL = config.MAP_SERVICE_API_URL
const KEY = config.MAP_SERVICE_API_KEY

/**
 * @api {get} /api/districts/ Get all districts
 * @apiGroup Districts
 * @apiSuccess (200) {Object[]} void Array contains all
 */
districts.get('/', async (ctx) => {
  try {
    let data = null
    const qs = querystring.parse(ctx.request.querystring)

    if (qs.search) {
      const raw = await request({
        url: `${URL}search?&keyword=${encodeURI(qs.search)}&key=${KEY}`,
      })
      data = JSON.parse(raw).result[0].filter(each => (each.level <= 2))
    } else {
      const raw = await request({
        url: `${URL}list?key=${KEY}`,
      })
      data = JSON.parse(raw).result[1]
    }

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { districts }
