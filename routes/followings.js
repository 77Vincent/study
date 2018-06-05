const Router = require('koa-router')

const Database = require('../database.js')
const { General, Auth } = require('../services')
const config = require('../config')

const followings = Router()
const FollowerFollowing = Database.model('follower_following')
const { protect } = Auth

/** 
 * @api {get} /api/followings/ Get all targets followed by the current user
 * @apiGroup Followings 
 * @apiParam (Query String) {Integer} [follower_id] Filtered by user ID of followers
 * @apiParam (Query String) {Integer} [following_id] Filtered by user ID of followings
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all targets followed by the current user
 */
followings.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const data = await FollowerFollowing.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(qs.page, config.queryLimit),
      where: { $and: General.getFilter(qs, ['follower_id', 'following_id']) }
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/followings/ Create a major
 * @apiGroup Followings
 * @apiParam {String} following_id The user ID of the target
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 */
followings.put('/', protect, async (ctx) => {
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
 * @api {delete} /api/followings/:following_id Unfollow
 * @apiGroup Followings 
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 404 The requested content is found
 */
followings.delete('/:following_id', protect, async (ctx) => {
  const where = {
    follower_id: ctx.state.currentUserID,
    following_id: ctx.params.following_id
  }
  const data = await FollowerFollowing.findOne({ where })
  if (!data) { return }

  await FollowerFollowing.destroy({ where })
  ctx.status = 200
})

module.exports = { followings }