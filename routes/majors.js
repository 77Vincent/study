const Router = require('koa-router')
const py = require('pinyin')
const seq = require('sequelize-easy-query')

const { Major } = require('../models')
const { General, Auth } = require('../services')

const majors = Router()
const { protect } = Auth

/**
 * @api {get} /api/majors/ Get all
 * @apiGroup Majors
 * @apiParam (Query String) {String} [search] Search by Chinese phonetic alphabet, Chinese name or English name
 * @apiSuccess (200) {object[]} void Array contains all results
 */
majors.get('/', async (ctx) => {
  try {
    const data = await Major.findAll({
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
 * @api {put} /api/majors/ Create one
 * @apiGroup Majors
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiSuccess (201) {Object} void The created one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
majors.put('/', protect, async (ctx) => {
  try {
    const { en, cn } = ctx.request.body
    const pinyin = ctx.request.body.pinyin || py(cn, { style: py.STYLE_NORMAL }).join('')
    const data = await Major.create({ en, cn, pinyin })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/majors/:id Update one
 * @apiGroup Majors
 * @apiParam {String} en The English name
 * @apiParam {String} cn The Chinese name
 * @apiParam {String} pinyin The Chinese phonetic alphabet
 * @apiSuccess (200) {Object} void The Updated one
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
majors.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Major, async (current) => {
    const data = await current.update(ctx.request.body)
    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/majors/:id Delete one
 * @apiGroup Majors
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
majors.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Major, async (data) => {
    await Major.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { majors }
