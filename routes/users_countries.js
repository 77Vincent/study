const Router = require('koa-router')
const querystring = require('querystring')

const Database = require('../database.js')
const { General, Auth, sequelizeQuery } = require('../services')
const { Country } = require('../models')
const config = require('../config')

const users_countries = Router()
const UserCountry = Database.model('user_country')
const { protect } = Auth

/**
 * @api {get} /api/users_countries/ Get all user and country relations
 * @apiGroup Users_Countries
 * @apiParam (Query String) {Integer} [user_id] Filtered by user ID
 * @apiParam (Query String) {Integer} [country_id] Filtered by country ID
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all users and countrys relations
 */
users_countries.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await UserCountry.findAll({
      limit: config.LIMIT,
      offset: General.getOffset(query.page, config.LIMIT),
      where: sequelizeQuery.where(ctx.request.querystring, {
        filterBy: ['user_id', 'country_id'],
      }),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/users_countries/ Create a user and country relation
 * @apiGroup Users_Countries
 * @apiParam {string[]} country_id The array of countrys' ID
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
users_countries.put('/', protect, async (ctx) => {
  try {
    const { country_id } = ctx.request.body
    const user_id = ctx.state.currentUserID

    await UserCountry.destroy({ where: { user_id } })

    for (let i = 0; i < country_id.length; i += 1) {
      await UserCountry.create({ user_id, country_id: country_id[i] })
    }

    const data = await Country.findAll({ where: { id: country_id } })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/users_countries/:country_id Remove a user and country relation
 * @apiGroup Users_Countries
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
users_countries.delete('/:country_id', protect, async (ctx) => {
  const where = {
    user_id: ctx.state.currentUserID,
    country_id: ctx.params.country_id,
  }
  const data = await UserCountry.findOne({ where })
  if (!data) { return }

  await UserCountry.destroy({ where })
  ctx.status = 200
})

module.exports = { users_countries }
