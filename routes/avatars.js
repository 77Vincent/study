const querystring = require('querystring')
const Router = require('koa-router')
const mime = require('mime')

const config = require('../config.js')
const { Avatar, User } = require('../models')
const { General, Storage, Auth } = require('../services')

const { protect } = Auth
const avatars = Router()

/**
 * @api {get} /api/avatars Get all
 * @apiGroup Avatars
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all
 */
avatars.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await Avatar.findAll({
      limit: config.LIMIT,
      offset: General.getOffset(query.page, config.LIMIT),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {get} /api/avatars/:id Get a one
 * @apiGroup Avatars
 * @apiSuccess (200) {binary} void The image file
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
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/avatars Create one
 * @apiGroup Avatars
 * @apiParam {String} content Content of the image file encoded in base64
 * @apiParam {String} mime The MIME of the file
 * @apiSuccess (201) {Object} void The created one
 * @apiError {String} 400 Bad request due to the lack of some necessary content in the request body
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 409 The resource being created already exists
 */
avatars.put('/', protect, async (ctx) => {
  try {
    const { content } = ctx.request.body
    const mimeType = ctx.request.body.mime

    // Stop the request if any input is missing
    if (!content || !mimeType) {
      ctx.status = 400
      ctx.body = config.messages.INVALID_REQUEST
      return
    }

    const user_id = ctx.state.currentUserID
    const avatar = await Avatar.findOne({ where: { user_id } })

    if (avatar) {
      ctx.status = 409
      return
    }

    // Store file and create a record in database
    const path = Storage.store('avatar', content, mimeType)
    const data = await Avatar.create({ user_id, path })

    // Update the corresponding user's avatar_id
    const user = await User.findOne({ where: { id: user_id } })
    await user.update({ avatar_id: data.dataValues.id })

    ctx.status = 201
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/avatars/:id Update one
 * @apiGroup Avatars
 * @apiParam {String} content Content of the file encoded in base64
 * @apiParam {String} mime The MIME of the file
 * @apiSuccess (200) {Object} void The updated one
 * @apiError {String} 400 Bad request due to the lack of some necessary content in the request body
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
avatars.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Avatar, async (current) => {
    const { content } = ctx.request.body
    const mimeType = ctx.request.body.mime
    if (!content || !mimeType) {
      ctx.status = 400
      ctx.body = config.messages.INVALID_REQUEST
      return
    }

    const path = Storage.store('avatar', content, mimeType)
    Storage.remove(current.dataValues.path)
    const data = await current.update({ path })

    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/avatars Delete one
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
