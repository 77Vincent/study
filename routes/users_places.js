const Router = require('koa-router')
const querystring = require('querystring')

const Database = require('../database.js')
const { General, Auth, Filter } = require('../services')
const { School } = require('../models')
const config = require('../config')

const users_places = Router()
const UserPlace = Database.model('user_place')
const { protect } = Auth

/**
 * @api {get} /api/users_places/ Get all user and place relations
 * @apiGroup Users_Schools
 * @apiParam (Query String) {Integer} [user_id] Filtered by user ID
 * @apiParam (Query String) {Integer} [place_id] Filtered by place ID
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all users and places relations
 */
users_places.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await UserPlace.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      where: new Filter(ctx.request.querystring).filterBy(['user_id', 'place_id']).done(),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/users_places/ Create a user and place relation
 * @apiGroup Users_Schools
 * @apiParam {string[]} place_id The array of places' ID
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
users_places.put('/', protect, async (ctx) => {
  try {
    const { place_id } = ctx.request.body
    const user_id = ctx.state.currentUserID

    await UserPlace.destroy({ where: { user_id } })

    for (let i = 0; i < place_id.length; i += 1) {
      await UserPlace.create({ user_id, place_id: place_id[i] })
    }

    const data = await School.findAll({ where: { id: place_id } })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/users_places/:place_id Remove a user and place relation
 * @apiGroup Users_Schools
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
users_places.delete('/:place_id', protect, async (ctx) => {
  const where = {
    user_id: ctx.state.currentUserID,
    place_id: ctx.params.place_id,
  }
  const data = await UserPlace.findOne({ where })
  if (!data) { return }

  await UserPlace.destroy({ where })
  ctx.status = 200
})

module.exports = { users_places }
