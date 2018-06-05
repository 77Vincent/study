const Router = require('koa-router')

const Database = require('../database.js')
const { General, Auth } = require('../services')
const config = require('../config')

const users_majors = Router()
const UserMajor = Database.model('user_major')
const { protect } = Auth

/** 
 * @api {get} /api/users_majors/ Get all users and majors relations
 * @apiGroup Users_Majors 
 * @apiParam (Query String) {Integer} [user_id] Filtered by user ID 
 * @apiParam (Query String) {Integer} [major_id] Filtered by major ID
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all users and majors relations
 */
users_majors.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const data = await UserMajor.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(qs.page, config.queryLimit),
      where: { $and: General.getFilter(qs, ['user_id', 'major_id']) }
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/users_majors/ Create a major
 * @apiGroup Users_Majors
 * @apiParam {String} major_id The major ID
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 */
users_majors.put('/', protect, async (ctx) => {
  try {
    const { major_id } = ctx.request.body
    const user_id = ctx.state.currentUserID
    await UserMajor.create({ user_id, major_id })

    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/users_majors/:major_id Remove a major
 * @apiGroup Users_Majors 
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 404 The requested content is found
 */
users_majors.delete('/:major_id', protect, async (ctx) => {
  const where = {
    user_id: ctx.state.currentUserID,
    major_id: ctx.params.major_id
  }
  const data = await UserMajor.findOne({ where })
  if (!data) { return }

  await UserMajor.destroy({ where })
  ctx.status = 200
})

module.exports = { users_majors }