const Router = require('koa-router')
const querystring = require('querystring')
const py = require('pinyin')
const seq = require('sequelize-easy-query')

const { School } = require('../models')
const { General, Auth } = require('../services')
const config = require('../config')

const schools = Router()
const { protect } = Auth

/**
 * @api {get} /api/schools/ Get all
 * @apiGroup Schools
 * @apiParam (Query String) {String} [id] Filtered by id
 * @apiParam (Query String) {String} [country_code] Filtered by country code
 * @apiParam (Query String) {String} [search] Search by Chinese phonetic alphabet, Chinese name or English name
 * @apiSuccess (200) {object[]} void Array contains all
 */
schools.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await School.findAll({
      limit: config.LIMIT,
      offset: General.getOffset(query.page, config.LIMIT),
      where: seq(ctx.request.querystring, {
        filterBy: ['id', 'country_code'],
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
 * @api {put} /api/schools/ Create a school
 * @apiGroup Schools
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiParam {String} website The website URL
 * @apiParam {String} country_code The country code of the school
 * @apiSuccess (201) {Object} void The created one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
schools.put('/', protect, async (ctx) => {
  try {
    const {
      en, cn, website, country_code,
    } = ctx.request.body
    const pinyin = ctx.request.body.pinyin || py(cn, { style: py.STYLE_NORMAL }).join('')
    const data = await School.create({
      en, cn, pinyin, website, country_code,
    })

    ctx.status = 201
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/schools/:id Update one
 * @apiGroup Schools
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiParam {String} website The website URL
 * @apiParam {String} country_code The country code of the school
 * @apiSuccess (200) {Object} void The Updated one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
schools.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, School, async (current) => {
    const data = await current.update(ctx.request.body)

    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/schools/:id Delete one
 * @apiGroup Schools
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
schools.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, School, async (data) => {
    await School.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { schools }
