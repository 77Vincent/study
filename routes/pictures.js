import Router from 'koa-router'

import { Picture } from '../models'
import { General } from '../utils'

export const pictures = Router()

/** 
 * @api {get} /api/pictures/ Get all pictures
 * @apiGroup Pictures
 * @apiSuccess (200) {object[]} void Array contains all pictures
 */
pictures.get('/', async (ctx) => {
  try {
    const data = await Picture.findAll()

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/pictures/ Create a picture
 * @apiGroup Pictures
 * @apiSuccess (201) {object} void The created picture
 */
pictures.put('/', async (ctx) => {
  try {
    const { post_id, url } = ctx.request.body
    const data = await Picture.create({ post_id, url })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/pictures/:id Delete a picture
 * @apiGroup Pictures
 * @apiSuccess (200) {void} void void
 */
pictures.delete('/:id', async (ctx) => {
  try {
    await Picture.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})