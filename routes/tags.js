const Router = require('koa-router')

const { Tag } = require('../models')
const { General, Auth, Routing } = require('../services')

const tags = Router()
const { protect } = Auth

/** 
 * @api {get} /api/tags/ Get all tags
 * @apiGroup Tags
 * @apiSuccess (200) {object[]} void Array contains all tags
 */
tags.get('/', async (ctx) => {
  try {
    const data = await Tag.findAll()

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
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
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 */
tags.put('/', protect, async (ctx) => {
  try {
    const { content } = ctx.request.body
    const user_id = ctx.state.currentUserID
    const data = await Tag.create({ content, user_id })

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
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 No content is found
 */
tags.post('/:id', protect, async (ctx) => {
  await Routing.postBase(Tag, ctx)
})

/** 
 * @api {delete} /api/tags/:id Delete a tag
 * @apiGroup Tags
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 No content is found
 */
tags.delete('/:id', protect, async (ctx) => {
  try {
    let data = await Tag.findOne({ where: { id: ctx.params.id } })
    if (!data) { return }

    if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.currentUserID === 0) {
      await Tag.destroy({ where: { id: ctx.params.id } })
      ctx.status = 200
    } else {
      ctx.status = 403
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { tags }