const Router = require('koa-router')
const mime = require('mime')

const config = require('../config.js')
const { Avatar, User } = require('../models')
const { General, Storage, Auth } = require('../services')

const { protect } = Auth
const avatars = Router()

/** 
 * @api {get} /api/avatars Get all avatars
 * @apiGroup Avatars
 * @apiParam (Query String) {Integer} [page=1] Pagination
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
 * @apiError {String} 404 The requested content is found
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
 * @apiParam {String} content Content of the image file encoded in base64
 * @apiParam {String} mime The MIME of the file 
 * @apiSuccess (201) {Object} void The created avatar
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 409 The resource being created already exists
 */
avatars.put('/', protect, async (ctx) => {
  try {
    const { content, mime } = ctx.request.body
    const user_id = ctx.state.currentUserID
    const avatar = await Avatar.findOne({ where: { user_id } })

    if (avatar) {
      ctx.status = 409
      return
    }

    // Store file and create avatar instance
    const path = Storage.store('avatar', content, mime)
    const data = await Avatar.create({ user_id, path })

    // Update the corresponding user's avatar_id
    const user = await User.findOne({ where: { id: user_id } })
    await user.update({ avatar_id: data.dataValues.id })

    ctx.status = 201
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/avatars/:id Update a avatar 
 * @apiGroup Avatars
 * @apiParam {String} content Content of the avatar file encoded in base64
 * @apiParam {String} mime The MIME of the file 
 * @apiSuccess (200) {Object} void The updated avatar
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
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
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
avatars.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Avatar, async (data) => {
    Storage.remove(data.dataValues.path)
    await Avatar.destroy({ where: { id: ctx.params.id } })

    // Delete the corresponding user's avatar_id
    const user = await User.findOne({ where: { id: ctx.state.currentUserID } })
    await user.update({ avatar_id: null })

    ctx.status = 200
  })
})

module.exports = { avatars }