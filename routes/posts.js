const Router = require('koa-router')
const queryString = require('query-string')

const config = require('../config')
const { Post, Comment } = require('../models')
const { General, Auth, Filter } = require('../services')

const posts = Router()
const { protect } = Auth

/**
 * @api {get} /api/posts Get all posts
 * @apiGroup Posts
 * @apiDescription Posts are ordered by updated time in DESC order by default
 * @apiParam (Query String) {Integer} [user_id] Filtered by user ID
 * @apiParam (Query String) {String} [search] Search by posts' content
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all posts
 */
posts.get('/', async (ctx) => {
  try {
    const query = queryString.parse(ctx.request.querystring)
    const data = await Post.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      order: [['updated_at', 'DESC']],
      where: new Filter(ctx.request.querystring).filterBy(['user_id']).searchBy(['content']).done(),
    })

    for (let i = 0; i < data.length; i += 1) {
      const current = data[i].dataValues
      const { id } = current
      const comments = await Comment.findAll({ where: { post_id: id } })
      current.comments = comments.length
      current.pictures_url = General.getDomain(`/api/pictures?post_id=${id}`)
      current.comments_url = General.getDomain(`/api/comments?post_id=${id}`)
    }

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {get} /api/posts/:id Get a post
 * @apiGroup Posts
 * @apiSuccess (200) {Object} void A post object
 */
posts.get('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const data = await Post.findOne({ where: { id } })
    const comments = await Comment.findAll({ where: { post_id: id } })

    if (data) {
      data.dataValues.comments = comments.length
      data.dataValues.pictures_url = General.getDomain(`/api/pictures?post_id=${id}`)
      data.dataValues.comments_url = General.getDomain(`/api/comments?post_id=${id}`)
    }

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/posts Create a post
 * @apiGroup Posts
 * @apiParam {String} user_id The creator's user ID
 * @apiParam {String} content The post content
 * @apiSuccess (201) {Object} void The created post
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
posts.put('/', protect, async (ctx) => {
  try {
    const { content, user_id } = ctx.request.body
    const data = await Post.create({ content, user_id })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/posts/:id Delete a post
 * @apiGroup Posts
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
posts.delete('/:id', protect, async (ctx) => {
  try {
    await Post.destroy({
      where: { id: ctx.params.id },
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { posts }
