const Router = require('koa-router')

const { School } = require('../models')
const { General, Auth, Filter } = require('../services')
const config = require('../config')

const schools = Router()
const { protect } = Auth

/** 
 * @api {get} /api/schools/ Get all schools
 * @apiGroup Schools 
 * @apiParam (Query String) {String} [country_code] Filtered by country code
 * @apiParam (Query String) {String} [search] Search by English and Chinese name
 * @apiSuccess (200) {object[]} void Array contains all schools
 */
schools.get('/', async (ctx) => {
  try {
    const query = General.parseQuerystring(ctx.request.querystring)
    const data = await School.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      where: new Filter(query).filterBy(['country_code']).searchBy(['en', 'cn']).done()
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
 * @apiParam {String} en The school's English name
 * @apiParam {String} cn The school's Chinese name
 * @apiParam {String} website The school's website
 * @apiParam {String} country_code The country code of the country where the school is located
 * @apiSuccess (201) {Object} void The created school 
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 */
schools.put('/', protect, async (ctx) => {
  try {
    const { en, cn, website, country_code } = ctx.request.body
    const data = await School.create({ en, cn, website, country_code })

    ctx.status = 201
    ctx.body= data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/schools/:id Update a school 
 * @apiGroup Schools 
 * @apiParam {String} en The school's English name
 * @apiParam {String} cn The school's Chinese name
 * @apiParam {String} website The school's website
 * @apiParam {String} country_code The country code of the country where the school is located
 * @apiSuccess (200) {Object} void The Updated school 
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
schools.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, School, async (data) => {
    data = await data.update(ctx.request.body)

    ctx.status = 200
    ctx.body = data
  })
})

/** 
 * @api {delete} /api/schools/:id Delete a school 
 * @apiGroup Schools 
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
schools.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, School, async (data) => {
    await School.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { schools }