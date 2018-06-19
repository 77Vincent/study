const Router = require('koa-router')
const request = require('request-promise-native')

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
districts.get('/:place', async (ctx) => {
  try {
    const raw = await request({
      url: `${URL}search?&keyword=${encodeURI(ctx.params.place)}&key=${KEY}`,
    })
    const data = JSON.parse(raw).result[0].filter(each => (each.level <= 2))

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { districts }
