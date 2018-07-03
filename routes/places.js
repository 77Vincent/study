const Router = require('koa-router')
const py = require('pinyin')

const { Place } = require('../models')
const { General, Auth, seq } = require('../services')

const places = Router()
const { protect } = Auth

/**
 * @api {get} /api/places/ Get all
 * @apiGroup Places
 * @apiParam (Query String) {String} [search] Search by Chinese phonetic alphabet, Chinese name or English name
 * @apiSuccess (200) {object[]} void Array contains all results
 */
places.get('/', async (ctx) => {
  try {
    const data = await Place.findAll({
      where: seq(ctx.request.querystring, {
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
 * @api {put} /api/places/ Create one
 * @apiGroup Places
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiSuccess (201) {Object} void The created one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
places.put('/', protect, async (ctx) => {
  try {
    const { en, cn } = ctx.request.body
    const pinyin = ctx.request.body.pinyin || py(cn, { style: py.STYLE_NORMAL }).join('')
    const data = await Place.create({ en, cn, pinyin })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/places/:id Update one
 * @apiGroup Places
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiSuccess (200) {Object} void The Updated one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
places.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Place, async (current) => {
    const data = await current.update(ctx.request.body)
    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/places/:id Delete one
 * @apiGroup Places
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
places.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Place, async (data) => {
    await Place.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { places }
