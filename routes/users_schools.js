const Router = require('koa-router')
const querystring = require('querystring')

const Database = require('../services/database')
const { General, Auth, sequelizeQuery } = require('../services')
const { School } = require('../models')
const config = require('../config')

const users_schools = Router()
const UserSchool = Database.model('user_school')
const { protect } = Auth

/**
 * @api {get} /api/users_schools/ Get all user and school relations
 * @apiGroup Users_Schools
 * @apiParam (Query String) {Integer} [user_id] Filtered by user ID
 * @apiParam (Query String) {Integer} [school_id] Filtered by school ID
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all users and schools relations
 */
users_schools.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await UserSchool.findAll({
      limit: config.LIMIT,
      offset: General.getOffset(query.page, config.LIMIT),
      where: sequelizeQuery.where(ctx.request.querystring, {
        filterBy: ['user_id', 'school_id'],
      }),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/users_schools/ Create a user and school relation
 * @apiGroup Users_Schools
 * @apiParam {string[]} school_id The array of schools' ID
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
users_schools.put('/', protect, async (ctx) => {
  try {
    const { school_id } = ctx.request.body
    const user_id = ctx.state.currentUserID

    await UserSchool.destroy({ where: { user_id } })

    for (let i = 0; i < school_id.length; i += 1) {
      await UserSchool.create({ user_id, school_id: school_id[i] })
    }

    const data = await School.findAll({ where: { id: school_id } })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/users_schools/:school_id Remove a user and school relation
 * @apiGroup Users_Schools
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
users_schools.delete('/:school_id', protect, async (ctx) => {
  const where = {
    user_id: ctx.state.currentUserID,
    school_id: ctx.params.school_id,
  }
  const data = await UserSchool.findOne({ where })
  if (!data) { return }

  await UserSchool.destroy({ where })
  ctx.status = 200
})

module.exports = { users_schools }
