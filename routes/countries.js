const Router = require('koa-router')
const py = require('pinyin')

const { General, Auth, sequelizeQuery } = require('../services')
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
    const data = await Country.findAll({
      where: sequelizeQuery.where(ctx.request.querystring, {
        searchBy: ['pinyin', 'cn', 'en'],
      }),
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
