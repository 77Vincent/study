const Router = require('koa-router')
const Sequelize = require('sequelize')
const mime = require('mime')
const queryString = require('query-string')

const { Picture } = require('../models')
const { General, Storage, Auth } = require('../services')
const c = require('../config')

const { Op } = Sequelize
const pictures = Router()
const { protect } = Auth

/**
 * @api {get} /api/pictures/ Get all pictures
 * @apiGroup Pictures
 * @apiParam (Query String) {Integer} [post_id] Filtered by post's ID it belongs to
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all pictures
 */
pictures.get('/', async (ctx) => {
  try {
    const query = queryString.parse(ctx.request.querystring)
    const data = await Picture.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(query.page, c.queryLimit),
      where: { [Op.and]: General.getFilter(query, ['post_id']) },
    })

    ctx.status = 200
    ctx.body = data
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
 * @apiParam {String} content Content of the image file in base64
 * @apiParam {String} mime The MIME of the file
 * @apiParam {Integer} post_id It's post ID
 * @apiSuccess (201) {Object} void The created picture
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
pictures.put('/', protect, async (ctx) => {
  try {
    const { content, post_id } = ctx.request.body
    const mimeType = ctx.request.body.mime
    const path = Storage.store('picture', content, mimeType, post_id)
    const data = await Picture.create({ post_id, path })

    ctx.status = 201
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/pictures/:id Delete a picture
 * @apiGroup Pictures
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
pictures.delete('/:id', protect, async (ctx) => {
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

module.exports = { pictures }
