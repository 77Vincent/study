const request = require('request-promise-native')
const Router = require('koa-router')
const py = require('pinyin')

const { General, Auth, Filter } = require('../services')
const { Country } = require('../models')

const { protect } = Auth

const locations = Router()
const key = '74OBZ-IPQRV-YXJPL-UGYMF-EIMU3-XPFNP'

/**
 * @api {get} /api/locations/ Get all countries
 * @apiGroup Locations
 * @apiSuccess (200) {Object[]} void Array contains all countries
 */
locations.get('/', async (ctx) => {
  try {
    const query = General.parseQuerystring(ctx.request.querystring)
    const data = await Country.findAll({
      where: new Filter(query).searchBy(['pinyin', 'cn', 'en']).done(),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/locations/ Create a country
 * @apiGroup Locations
 * @apiParam {String} code The Country code
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiSuccess (201) {Object} void The created one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
locations.put('/', protect, async (ctx) => {
  try {
    const {
      code, en, cn,
    } = ctx.request.body
    const pinyin = ctx.request.body.pinyin || py(cn, { style: py.STYLE_NORMAL }).join('')
    const data = await Country.create({
      code, en, cn, pinyin,
    })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {get} /api/locations/cities Get all cities
 * @apiGroup Locations
 * @apiSuccess (200) {object[]} void Array contains all locations
 */
locations.get('/cn/cities', async (ctx) => {
  try {
    // const query = General.parseQuerystring(ctx.request.querystring)
    const data = await request({
      url: `https://apis.map.qq.com/ws/district/v1/list?key=${key}`,
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { locations }
