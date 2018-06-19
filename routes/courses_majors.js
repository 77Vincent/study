const Router = require('koa-router')
const querystring = require('querystring')

const Database = require('../database.js')
const { General, Auth, Filter } = require('../services')
const config = require('../config')

const courses_majors = Router()
const CourseMajor = Database.model('course_major')
const { protect } = Auth

/**
 * @api {get} /api/courses_majors/ Get all course and major relations
 * @apiGroup Courses_Majors
 * @apiParam (Query String) {Integer} [course_id] Filtered by course ID
 * @apiParam (Query String) {Integer} [major_id] Filtered by major ID
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all courses and majors relations
 */
courses_majors.get('/', async (ctx) => {
  try {
    const query = querystring.parse(ctx.request.querystring)
    const data = await CourseMajor.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(query.page, config.queryLimit),
      where: new Filter(ctx.request.querystring).filterBy(['course_id', 'major_id']).done(),
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/courses_majors/ Create a course and major relation
 * @apiGroup Courses_Majors
 * @apiParam {String} course_id The course ID
 * @apiParam {String} major_id The major ID
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
courses_majors.put('/', protect, async (ctx) => {
  try {
    const { course_id, major_id } = ctx.request.body
    await CourseMajor.create({ course_id, major_id })

    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {delete} /api/courses_majors/:major_id Remove a course and major relation
 * @apiGroup Courses_Majors
 * @apiParam {Integer} course_id The course ID
 * @apiParam {Integer} major_id The major ID
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 404 The requested content is found
 */
courses_majors.delete('/', protect, async (ctx) => {
  const { course_id, major_id } = ctx.request.body
  const where = { course_id, major_id }
  const data = await CourseMajor.findOne({ where })
  if (!data) { return }

  await CourseMajor.destroy({ where })
  ctx.status = 200
})

module.exports = { courses_majors }
