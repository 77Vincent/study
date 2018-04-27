import Router from 'koa-router'

import { Picture } from '../models'
import { General } from '../utils'
import c from '../config'

export const pictures = Router()

/** 
 * @api {get} /api/pictures/ Get all pictures
 * @apiGroup Pictures
 * @apiParam (Query String) {integer} [post_id] Filtered by post's ID it belongs to 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all pictures
 */
pictures.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)

    const data = await Picture.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: General.objToObjGroupsInArr(qs, ['post_id']) },
    })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/pictures/ Create a picture
 * @apiGroup Pictures
 * @apiParam {integer} post_id The post ID it belongs to
 * @apiParam {string} url The URL of the picture 
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