import Router from 'koa-router'

import { Comment } from '../models'
import { General } from '../utils'

export const comments = Router()

/** 
 * @api {get} /api/comments/ Get all comments
 * @apiGroup Comment 
 * @apiSuccess (200) {object[]} void Array contains all comments
 */
comments.get('/', async (ctx) => {
  try {
    const data = await Comment.findAll()

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/comments/ Create a comment
 * @apiGroup Comment 
 * @apiParam {integer} user_id The creator's user ID
 * @apiParam {integer} post_id The post ID it belongs to
 * @apiParam {string} content The content of the comment
 * @apiSuccess (201) {object} void The created comment
 */
comments.put('/', async (ctx) => {
  try {
    const { content, user_id, post_id } = ctx.request.body
    const data = await Comment.create({ content, user_id, post_id })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/comments/:id Delete a comment
 * @apiGroup Comment 
 * @apiSuccess (200) {void} void void
 */
comments.delete('/:id', async (ctx) => {
  try {
    await Comment.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})