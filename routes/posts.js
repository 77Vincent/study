const Router = require('koa-router')

const c = require('../config')
const { Post, Comment, Auth } = require('../models')
const { General } = require('../services')

const posts = Router()
const { authenticate } = Auth

/** 
 * @api {get} /api/posts Get all posts
 * @apiGroup Posts 
 * @apiDescription Posts are ordered by updated time in DESC order by default
 * @apiParam (Query String) {integer} [user_id] Filtered by user ID
 * @apiParam (Query String) {string} [content] Search by posts' content
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all posts
 */
posts.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let filter = General.getFilter(qs, ['user_id'])

    // Search
    if (qs.content) {
      filter.push({
        content: { $like: `%${decodeURI(qs.content)}%` }
      })
    }

    const data = await Post.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter },
      order: [['updated_at', 'DESC']]
    })

    for (let i = 0; i < data.length; i++) {
      const current = data[i].dataValues
      const { id } = current 
      const comments = await Comment.findAll({ where: { post_id: id } })
      current.comments = comments.length
      current.pictures_url = General.getDomain(`/api/pictures?post_id=${id}`) 
      current.comments_url = General.getDomain(`/api/comments?post_id=${id}`) 
    }

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/posts/:id Get a post
 * @apiGroup Posts 
 * @apiSuccess (200) {object} void A post object
 */
posts.get('/:id', async (ctx) => {
  try {
    const id = ctx.params.id
    const data = await Post.findOne({ where: { id } })
    const comments = await Comment.findAll({ where: { post_id: id } })

    if (data) {
      data.dataValues.comments = comments.length
      data.dataValues.pictures_url = General.getDomain(`/api/pictures?post_id=${id}`) 
      data.dataValues.comments_url = General.getDomain(`/api/comments?post_id=${id}`) 
    }

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/posts Create a post
 * @apiGroup Posts 
 * @apiParam {string} user_id The creator's user ID
 * @apiParam {string} content The post content
 * @apiSuccess (201) {object} void The created post
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
posts.put('/', authenticate, async (ctx) => {
  try {
    const { content, user_id } = ctx.request.body
    const data = await Post.create({ content, user_id })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/posts/:id Delete a post
 * @apiGroup Posts 
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
posts.delete('/:id', authenticate, async (ctx) => {
  try {
    await Post.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { posts }