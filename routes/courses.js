const Router = require('koa-router')

const { Course } = require('../models')
const { General, Auth } = require('../services')
const Database = require('../database')
const c = require('../config')

const courses = Router()
const { protect } = Auth

/** 
 * @api {get} /api/courses Get all courses
 * @apiGroup Courses 
 * @apiParam (Query String) {integer} [id] Filtered by the major ID
 * @apiParam (Query String) {integer} [user_id] Filtered by the creator's user ID
 * @apiParam (Query String) {string} [label] Search by course name
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all courses
 */
courses.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.getFilter(qs, ['id', 'user_id'])

    // this part is for majors filtering
    if (qs.majors) {
      const courses_id = await Database.model('course_major').findAll({
        where: { major_id: qs.majors.split(',') }
      })
      filter.push({ id: courses_id.map(item => item.dataValues.course_id) })
    }

    // Search
    if (qs.label) {
      filter.push({
        label: { $like: `%${decodeURI(qs.label)}%` }
      })
    }

    const data = await Course.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter }
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data) 
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/courses Create a course
 * @apiGroup Courses 
 * @apiParam {string} label The course name
 * @apiParam {string} [description] The course description
 * @apiParam {integer} user_id The creator's user ID
 * @apiSuccess (201) {object} void The created course
 * @apiError {string} 401 Protected resource, use Authorization header to get access
 */
courses.put('/', protect, async (ctx) => {
  try {
    const { label, description } = ctx.request.body
    const user_id = ctx.state.currentUserID
    const data = await Course.create({ label, description, user_id })

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/courses/:id Update a course
 * @apiGroup Courses 
 * @apiParam {string} label The course name
 * @apiParam {string} [description] The course description
 * @apiParam {integer} [user_id] The creator's user ID
 * @apiSuccess (200) {object} void The updated course
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 No content is found
 */
courses.post('/:id', protect, async (ctx) => {
  try {
    let data = await Course.findOne({ where: { id: ctx.params.id } })
    if (!data) { return }

    if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.currentUserID === 0) {
      data = await data.update(ctx.request.body)
      ctx.status = 200
      ctx.body = General.prettyJSON(data) 
    } else {
      ctx.status = 403
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/courses/:id Delete a course
 * @apiGroup Courses 
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 No content is found
 */
courses.delete('/:id', protect, async (ctx) => {
  try {
    let data = await Course.findOne({ where: { id: ctx.params.id } })
    if (!data) { return }

    if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.currentUserID === 0) {
      await Course.destroy({ where: { id: ctx.params.id } })
      ctx.status = 200
    } else {
      ctx.status = 403
    }
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { courses }