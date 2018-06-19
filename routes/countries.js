const Router = require('koa-router')
const py = require('pinyin')
const querystring = require('querystring')

const { General, Auth, Filter } = require('../services')
const { Country } = require('../models')

const { protect } = Auth

const countries = Router()

/**
 * @api {get} /api/countries/ Get all countries
 * @apiGroup Countries
 * @apiSuccess (200) {Object[]} void Array contains all countries
 */
countries.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
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
 * @api {put} /api/countries/ Create a country
 * @apiGroup Countries
 * @apiParam {String} code The Country code
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiSuccess (201) {Object} void The created one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
countries.put('/', protect, async (ctx) => {
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

module.exports = { countries }
