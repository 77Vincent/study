import Router from 'koa-router'
import c from '../config.js'
import mime from 'mime'

import { Avatar } from '../models'
import { General, Storage } from '../utils'

export const avatars = Router()

/** 
 * @api {get} /api/avatars Get all avatars
 * @apiGroup Avatars
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all avatars
 */
avatars.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)

    const data = await Avatar.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/avatars/user_id/:id Get a user avatar
 * @apiGroup Avatars
 * @apiSuccess (200) {binary} void The user avatar
 */
avatars.get('/user_id/:user_id', async (ctx) => {
  try {
    const { user_id } = ctx.params
    const data = await Avatar.findOne({ where: { user_id } })

    if (data) {
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
 * @api {put} /api/avatars Create a avatar 
 * @apiGroup Avatars
 * @apiParam {string} content Content of the avatar file in base64
 * @apiParam {string} mime The MIME of the file 
 * @apiParam {integer} user_id The creator's user ID
 * @apiSuccess (201) {object} void The created avatar
 */
avatars.put('/', async (ctx) => {
  try {
    const { content, mime, user_id } = ctx.request.body
    const path = Storage.store('avatar', content, mime, user_id)
    const data = await Avatar.create({ user_id, path })

    ctx.status = 201
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/avatars Update a avatar 
 * @apiGroup Avatars
 * @apiParam {string} content Content of the avatar file in base64
 * @apiParam {string} mime The MIME of the file 
 * @apiParam {integer} user_id The creator's user ID
 * @apiSuccess (200) {object} void The updated avatar
 */
avatars.post('/', async (ctx) => {
  try {
    const { content, mime, user_id } = ctx.request.body
    let data = await Avatar.findOne({ where: { user_id } })

    Storage.remove(data.dataValues.path)
    const path = Storage.store('avatar', content, mime, user_id)
    data = await data.update({ path })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/avatars Delete a avatar 
 * @apiGroup Avatars
 * @apiParam {integer} user_id The creator's user ID
 * @apiSuccess (200) {void} void void
 */
avatars.delete('/', async (ctx) => {
  try {
    const { user_id } = ctx.request.body
    const data = await Avatar.findOne({ where: { user_id } })
    Storage.remove(data.dataValues.path)
    await Avatar.destroy({ where: { user_id } })

    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})
