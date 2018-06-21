const querystring = require('querystring')
const Router = require('koa-router')
const mime = require('mime')

const config = require('../config.js')
const { Portfolio, User } = require('../models')
const { General, Storage, Auth } = require('../services')

const { protect } = Auth
const portfolios = Router()

/**
 * @api {get} /api/portfolios Get all
 * @apiGroup Portfolios
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all
 */
portfolios.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await Portfolio.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {get} /api/portfolios/:id Get a one
 * @apiGroup Portfolios
 * @apiSuccess (200) {binary} void The image file
 * @apiError {String} 404 The requested content is found
 */
portfolios.get('/:id', async (ctx) => {
  try {
    const data = await Portfolio.findOne({ where: { id: ctx.params.id } })

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
 * @api {put} /api/portfolios Create one
 * @apiGroup Portfolios
 * @apiParam {String} content Content of the image file encoded in base64
 * @apiParam {String} mime The MIME of the file
 * @apiSuccess (201) {Object} void The created one
 * @apiError {String} 400 Bad request due to the lack of some necessary content in the request body
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 409 The resource being created already exists
 */
portfolios.put('/', protect, async (ctx) => {
  try {
    const { content } = ctx.request.body
    const mimeType = ctx.request.body.mime

    // Stop the request if any input is missing
    if (!content || !mimeType) {
      ctx.status = 400
      ctx.body = config.messages.invalidRequest
      return
    }

    const user_id = ctx.state.currentUserID
    const portfolio = await Portfolio.findOne({ where: { user_id } })

    if (portfolio) {
      ctx.status = 409
      return
    }

    // Store file and create a record in database
    const path = Storage.store('portfolio', content, mimeType)
    const data = await Portfolio.create({ user_id, path })

    // Update the corresponding user's portfolio_id
    const user = await User.findOne({ where: { id: user_id } })
    await user.update({ portfolio_id: data.dataValues.id })

    ctx.status = 201
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/portfolios/:id Update one
 * @apiGroup Portfolios
 * @apiParam {String} content Content of the file encoded in base64
 * @apiParam {String} mime The MIME of the file
 * @apiSuccess (200) {Object} void The updated one
 * @apiError {String} 400 Bad request due to the lack of some necessary content in the request body
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
portfolios.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Portfolio, async (current) => {
    const { content } = ctx.request.body
    const mimeType = ctx.request.body.mime
    if (!content || !mimeType) {
      ctx.status = 400
      ctx.body = config.messages.invalidRequest
      return
    }

    const path = Storage.store('portfolio', content, mimeType)
    Storage.remove(current.dataValues.path)
    const data = await current.update({ path })

    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/portfolios Delete one
 * @apiGroup Portfolios
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
portfolios.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Portfolio, async (data) => {
    Storage.remove(data.dataValues.path)
    await Portfolio.destroy({ where: { id: ctx.params.id } })

    // Delete the corresponding user's portfolio_id
    const user = await User.findOne({ where: { id: ctx.state.currentUserID } })
    await user.update({ portfolio_id: null })

    ctx.status = 200
  })
})

module.exports = { portfolios }
