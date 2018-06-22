const Router = require('koa-router')
const querystring = require('querystring')

const { Comment } = require('../models')
const { General, Auth, sequelizeQuery } = require('../services')
const config = require('../config')

const comments = Router()
const { protect } = Auth

/**
 * @api {get} /api/comments/ Get all comments
 * @apiGroup Comments
 * @apiParam (Query String) {Integer} [user_id] Filtered by creator's user ID
 * @apiParam (Query String) {Integer} [post_id] Filtered by post's ID it belongs to
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all comments
 */
comments.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)

    const data = await Comment.findAll({
      limit: config.LIMIT,
      offset: General.getOffset(query.page, config.LIMIT),
      where: sequelizeQuery.where(ctx.request.querystring, {
        filterBy: ['user_id', 'post_id'],
      }),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/comments/ Create a comment
 * @apiGroup Comments
 * @apiParam {Integer} user_id The creator's user ID
 * @apiParam {Integer} post_id The post ID it belongs to
 * @apiParam {String} content The content of the comment
 * @apiSuccess (201) {Object} void The created comment
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
comments.put('/', protect, async (ctx) => {
  try {
    const data = await Comment.create(ctx.request.body)

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/comments/:id Delete a comment
 * @apiGroup Comments
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
comments.delete('/:id', protect, async (ctx) => {
  try {
    await Comment.destroy({
      where: { id: ctx.params.id },
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { comments }
