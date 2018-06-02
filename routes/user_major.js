const Router = require('koa-router')

const Database = require('../database.js')
const { General, Auth } = require('../services')
const config = require('../config')

const followings = Router()
const FollowerFollowing = Database.model('follower_following')
const { protect } = Auth

/** 
 * @api {get} /api/followings/ Get all targets followed by the current user
 * @apiGroup Follower_Following 
 * @apiParam (Query String) {integer} [follower_id] Filtered by user ID of followers
 * @apiParam (Query String) {integer} [following_id] Filtered by user ID of followings
 * @apiParam (Query String) {integer} [page=1] Pagination
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
 * @apiParam {string} following_id The user ID of the target
 * @apiSuccess (201) {object} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
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
 * @api {delete} /api/followings/:id Unfollow
 * @apiGroup Followings 
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 404 The requested content is found
 */
followings.delete('/:id', protect, async (ctx) => {
  const data = await FollowerFollowing.findOne({
    where: {
      follower_id: ctx.state.currentUserID,
      following_id: ctx.params.id
    }
  })
  if (!data) { return }

  await FollowerFollowing.destroy({
    where: {
      follower_id: ctx.state.currentUserID,
      following_id: ctx.params.id
    }
  })
  ctx.status = 200
})

module.exports = { followings }