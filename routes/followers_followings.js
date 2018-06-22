const Router = require('koa-router')
const querystring = require('querystring')

const Database = require('../database.js')
const { General, Auth, sequelizeQuery } = require('../services')
const config = require('../config')

const followers_followings = Router()
const FollowerFollowing = Database.model('follower_following')
const { protect } = Auth

/**
 * @api {get} /api/followers_followings/ Get all follower and following relations
 * @apiGroup Followers_Followings
 * @apiParam (Query String) {Integer} [follower_id] Filtered by user ID of followers
 * @apiParam (Query String) {Integer} [following_id] Filtered by user ID of followings
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all follower and following relations
 */
followers_followings.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await FollowerFollowing.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      where: sequelizeQuery.where(ctx.request.querystring, {
        filterBy: ['follower_id', 'following_id'],
      }),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/followers_followings/ Create a follower and following relation
 * @apiGroup Followers_Followings
 * @apiParam {String} following_id The user ID of the followed user
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
followers_followings.put('/', protect, async (ctx) => {
  try {
    const { following_id } = ctx.request.body
    const follower_id = ctx.state.currentUserID
    await FollowerFollowing.create({ follower_id, following_id })

    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/followers_followings/:following_id Remove a follower and following relation
 * @apiGroup Followers_Followings
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
followers_followings.delete('/:following_id', protect, async (ctx) => {
  const where = {
    follower_id: ctx.state.currentUserID,
    following_id: ctx.params.following_id,
  }
  const data = await FollowerFollowing.findOne({ where })
  if (!data) { return }

  await FollowerFollowing.destroy({ where })
  ctx.status = 200
})

module.exports = { followers_followings }
