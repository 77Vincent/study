const Router = require('koa-router')
const mime = require('mime')

const config = require('../config.js')
const { Avatar } = require('../models')
const { General, Storage, Auth } = require('../services')

const { protect } = Auth
const avatars = Router()

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
      limit: config.queryLimit,
      offset: General.getOffset(qs.page, config.queryLimit),
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {get} /api/avatars/:id Get a user avatar
 * @apiGroup Avatars
 * @apiSuccess (200) {binary} void The image file of user avatar
 * @apiError {string} 404 The requested content is found
 */
avatars.get('/:id', async (ctx) => {
  try {
    const data = await Avatar.findOne({ where: { id: ctx.params.id } })

    if (data) {
      const { path } = data.dataValues
      ctx.status = 200
      ctx.type = mime.getType(path.split('.')[1])
      ctx.body = Storage.restore(path)
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
 * @apiParam {string} content Content of the image file encoded in base64
 * @apiParam {string} mime The MIME of the file 
 * @apiSuccess (201) {object} void The created avatar
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 */
avatars.put('/', protect, async (ctx) => {
  try {
    const { content, mime } = ctx.request.body
    const user_id = ctx.state.currentUserID
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
 * @apiParam {string} content Content of the avatar file encoded in base64
 * @apiParam {string} mime The MIME of the file 
 * @apiSuccess (200) {object} void The updated avatar
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
avatars.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Avatar, async (data) => {
    const { content, mime } = ctx.request.body
    const path = Storage.store('avatar', content, mime)
    Storage.remove(data.dataValues.path)
    data = await data.update({ path })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  })
})

/** 
 * @api {delete} /api/avatars Delete a avatar 
 * @apiGroup Avatars
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
avatars.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Avatar, async (data) => {
    Storage.remove(data.dataValues.path)
    await Avatar.destroy({ where: { id: ctx.params.id } })

    ctx.status = 200
  })
})

module.exports = { avatars }