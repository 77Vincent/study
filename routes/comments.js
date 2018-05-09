const Router = require('koa-router')

const { Comment } = require('../models')
const { General, Auth } = require('../services')
const c = require('../config')

const comments = Router()

const { authenticate } = Auth

/** 
 * @api {get} /api/comments/ Get all comments
 * @apiGroup Comments
 * @apiParam (Query String) {integer} [user_id] Filtered by creator's user ID
 * @apiParam (Query String) {integer} [post_id] Filtered by post's ID it belongs to 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all comments
 */
comments.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.getFilter(qs, ['user_id', 'post_id'])

    const data = await Comment.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter },
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data) 
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/comments/ Create a comment
 * @apiGroup Comments
 * @apiParam {integer} user_id The creator's user ID
 * @apiParam {integer} post_id The post ID it belongs to
 * @apiParam {string} content The content of the comment
 * @apiSuccess (201) {object} void The created comment
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
comments.put('/', authenticate, async (ctx) => {
  try {
    const data = await Comment.create(ctx.request.body)

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/comments/:id Delete a comment
 * @apiGroup Comments
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
comments.delete('/:id', authenticate, async (ctx) => {
  try {
    await Comment.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { comments }