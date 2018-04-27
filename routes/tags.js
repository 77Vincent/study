import Router from 'koa-router'

import { Tag } from '../models'
import { General } from '../utils'

export const tags = Router()

const params = ['content', 'user_id']

/** 
 * @api {get} /api/tags/ Get all tags
 * @apiGroup Tags
 * @apiSuccess (200) {object[]} void Array contains all tags
 */
tags.get('/', async (ctx) => {
  try {
    const data = await Tag.findAll()

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/tags/ Create a tag
 * @apiGroup Tags
 * @apiParam {string} content Content of the tag
 * @apiParam {integer} user_id The creator's user ID
 * @apiSuccess (201) {object} void The created tag
 */
tags.put('/', async (ctx) => {
  try {
    const data = await Tag.create(General.batchExtractObj(ctx.request.body, params))

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/tags/ Update a tag
 * @apiGroup Tags
 * @apiParam {string} content Content of the tag
 * @apiSuccess (200) {object} void The Updated tag
 */
tags.post('/:id', async (ctx) => {
  try {
    let data = await Tag.findOne({ where: { id: ctx.params.id } })
    data = await data.update(General.batchExtractObj(ctx.request.body, params))

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/tags/:id Delete a tag
 * @apiGroup Tags
 * @apiSuccess (200) {void} void void
 */
tags.delete('/:id', async (ctx) => {
  try {
    await Tag.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})