import Router from 'koa-router'
import mime from 'mime'

import { Picture } from '../models'
import { General, Storage } from '../utils'
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
      where: { $and: General.getFilter(qs, ['post_id']) },
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/pictures/:id Get a picture
 * @apiGroup Pictures
 * @apiSuccess (200) {binary} void The picture
 */
pictures.get('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const data = await Picture.findOne({ where: { id } })

    if (data) {
      ctx.body = data
      const { path } = data.dataValues
      const file = Storage.restore(path) 
      ctx.status = 200
      ctx.type = mime.getType(path.split('.')[1])
      ctx.body = file
    } else {
      ctx.status = 404
    }

  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/pictures/ Create a picture
 * @apiGroup Pictures
 * @apiParam {string} content Content of the image file in base64
 * @apiParam {string} mime The MIME of the file 
 * @apiParam {integer} post_id It's post ID
 * @apiSuccess (201) {object} void The created picture
 */
pictures.put('/', async (ctx) => {
  try {
    const { content, mime, post_id } = ctx.request.body
    const path = Storage.store('picture', content, mime, post_id)
    const data = await Picture.create({ post_id, path })

    ctx.status = 201
    ctx.body = General.prettyJSON(data)
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
    const { id } = ctx.params
    const data = await Picture.findOne({ where: { id } })
    Storage.remove(data.dataValues.path)
    await Picture.destroy({ where: { id } })

    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})