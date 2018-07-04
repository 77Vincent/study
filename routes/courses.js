const Router = require('koa-router')
const querystring = require('querystring')
const seq = require('sequelize-easy-query')

const { Course, Major } = require('../models')
const { General, Auth } = require('../services')
const config = require('../config')

const courses = Router()
const { protect } = Auth

/**
 * @api {get} /api/courses Get all courses
 * @apiGroup Courses
 * @apiParam (Query String) {Integer} [major_id] Filtered by the major ID
 * @apiParam (Query String) {Integer} [user_id] Filtered by the creator's user ID
 * @apiParam (Query String) {String} [search] Search by course name
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all courses
 */
courses.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await Course.findAll({
      limit: config.LIMIT,
      offset: General.getOffset(query.page, config.LIMIT),
      include: [{
        model: Major,
        attributes: ['id'],
        where: seq(ctx.request.querystring, {
          filterByAlias: { id: 'major_id' },
        }),
      }],
      where: seq(ctx.request.querystring, {
        filterBy: ['user_id'],
        searchBy: ['label'],
      }),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/courses Create a course
 * @apiGroup Courses
 * @apiParam {String} label The course name
 * @apiParam {String} [description] The course description
 * @apiParam {Integer} user_id The creator's user ID
 * @apiSuccess (201) {Object} void The created course
 * @apiError {String} 401 Protected resource, use Authorization header to get access
 */
courses.put('/', protect, async (ctx) => {
  try {
    const { label, description } = ctx.request.body
    const user_id = ctx.state.currentUserID
    const data = await Course.create({ label, description, user_id })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/courses/:id Update a course
 * @apiGroup Courses
 * @apiParam {String} label The course name
 * @apiParam {String} [description] The course description
 * @apiSuccess (200) {Object} void The updated course
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
courses.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Course, async (data) => {
    await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/courses/:id Delete a course
 * @apiGroup Courses
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
courses.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Course, async (data) => {
    await Course.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { courses }
