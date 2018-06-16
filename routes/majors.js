const Router = require('koa-router')

const { Major } = require('../models')
const { General, Auth, Filter } = require('../services')

const majors = Router()
const { protect } = Auth

/** 
 * @api {get} /api/majors/ Get all majors
 * @apiGroup Majors 
 * @apiSuccess (200) {object[]} void Array contains all majors
 */
majors.get('/', async (ctx) => {
  try {
    const query = General.parseQuerystring(ctx.request.querystring)
    const data = await Major.findAll({
      where: new Filter(query).searchBy(['pinyin', 'cn', 'en']).done()
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/majors/ Create a major
 * @apiGroup Majors 
 * @apiParam {String} en The major's English name
 * @apiParam {String} cn The major's Chinese name
 * @apiSuccess (201) {Object} void The created major 
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 */
majors.put('/', protect, async (ctx) => {
  try {
    const { en, cn, pinyin } = ctx.request.body
    const data = await Major.create({ en, cn, pinyin })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/majors/:id Update a tag
 * @apiGroup Majors 
 * @apiParam {String} en The major's English name
 * @apiParam {String} cn The major's Chinese name
 * @apiSuccess (200) {Object} void The Updated tag
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
majors.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Major, async (data) => {
    data = await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = data
  })
})

/** 
 * @api {delete} /api/majors/:id Delete a major 
 * @apiGroup Majors 
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
majors.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Major, async (data) => {
    await Major.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { majors }