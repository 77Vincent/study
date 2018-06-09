const Router = require('koa-router')
const Sequelize = require('sequelize')

const { School } = require('../models')
const { General, Auth } = require('../services')
const config = require('../config')

const { Op } = Sequelize
const schools = Router()
const { protect } = Auth

/** 
 * @api {get} /api/schools/ Get all schools
 * @apiGroup Schools 
 * @apiParam (Query String) {String} [country_code] Filtered by country code
 * @apiSuccess (200) {object[]} void Array contains all schools
 */
schools.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.getFilter(qs, ['country_code'])

    // Search
    if (qs.search) {
      filter.push({
        cn: { [Op.like]: `%${decodeURI(qs.search)}%` }
      })
    }

    const data = await School.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(qs.page, config.queryLimit),
      where: { [Op.and]: filter }
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
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

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/schools/:id Update a tag
 * @apiGroup Schools 
 * @apiParam {String} en The school's English name
 * @apiParam {String} cn The school's Chinese name
 * @apiParam {String} website The school's website
 * @apiParam {String} country_code The country code of the country where the school is located
 * @apiSuccess (200) {Object} void The Updated tag
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
schools.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, School, async (data) => {
    data = await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = General.prettyJSON(data)
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