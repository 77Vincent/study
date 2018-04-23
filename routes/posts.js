import Router from 'koa-router'

import c from '../config'
import { Post, Picture, Comment } from '../models'
import { General } from '../utils'

export const posts = Router()

const filters = ['user_id']

/** 
 * @api {get} /api/posts Get all posts
 * @apiGroup Posts 
 * @apiParam (Query String) {integer} [user_id] Filtered by user ID
 * @apiParam (Query String) {string} [content] Search by posts' content
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all posts
 */
posts.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let filter = General.objToObjGroupsInArr(qs, filters)

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
    })
    data.map(each => {
      const { id } = each.dataValues
      each.dataValues.pictures_url = General.getDomain(`/api/posts/${id}/pictures`) 
      each.dataValues.comments_url = General.getDomain(`/api/posts/${id}/comments`) 
    })

    General.simpleSend(ctx, data)
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
    data.dataValues.pictures_url = General.getDomain(`/api/posts/${id}/pictures`) 
    data.dataValues.comments_url = General.getDomain(`/api/posts/${id}/comments`) 

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/posts/:id/pictures Get a post's pictures
 * @apiGroup Posts 
 * @apiSuccess (200) {object[]} void Array contains all pictures from a post
 */
posts.get('/:id/pictures', async (ctx) => {
  try {
    const id = ctx.params.id
    const data = await Picture.findAll({ where: { post_id: id } })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/posts/:id/comments Get a post's comments
 * @apiGroup Posts 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all comments under a post
 */
posts.get('/:id/comments', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const id = ctx.params.id
    const data = await Comment.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { post_id: id } 
    })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/posts Create a post
 * @apiGroup Posts 
 * @apiParam {string} user_id The creator's user ID
 * @apiParam {string} content The post content
 * @apiParamExample {json} Request-example:
 *  {
 *    "user_id": 1,
 *    "content": "post content" 
 *  }
 * @apiSuccess (200) {object} void The created post
 */
posts.put('/', async (ctx) => {
  try {
    const { content, user_id } = ctx.request.body
    const data = await Post.create({ content, user_id })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/posts/:id Delete a post
 * @apiGroup Posts 
 * @apiSuccess (200) {void} void void
 */
posts.delete('/:id', async (ctx) => {
  try {
    await Post.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})