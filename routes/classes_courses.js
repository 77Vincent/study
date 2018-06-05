const Router = require('koa-router')

const Database = require('../database.js')
const { General, Auth } = require('../services')
const config = require('../config')

const classes_courses = Router()
const ClassCourse = Database.model('class_course')
const { protect } = Auth

/** 
 * @api {get} /api/classes_courses/ Get all classes and courses relations
 * @apiGroup Class_Course 
 * @apiParam (Query String) {Integer} [class_id] Filtered by class ID
 * @apiParam (Query String) {Integer} [course_id] Filtered by course ID 
 * @apiSuccess (200) {object[]} void Array contains all classes and courses relations
 */
classes_courses.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const data = await ClassCourse.findAll({
      limit: config.queryLimit,
      offset: General.getOffset(qs.page, config.queryLimit),
      where: { $and: General.getFilter(qs, ['course_id', 'class_id']) }
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/classes_courses/ Create a class and course relation
 * @apiGroup Class_Course
 * @apiParam {String} class_id The class ID
 * @apiParam {String} course_id The course ID
 * @apiSuccess (201) {Object} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 */
classes_courses.put('/', protect, async (ctx) => {
  try {
    const { course_id, class_id } = ctx.request.body
    await ClassCourse.create({ course_id, class_id })

    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/classes_courses/:class_id Remove a class and course relation
 * @apiGroup Class_Course 
 * @apiParam {Integer} class_id The class ID
 * @apiParam {Integer} course_id The course ID
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token 
 * @apiError {String} 404 The requested content is found
 */
classes_courses.delete('/', protect, async (ctx) => {
  const { course_id, class_id } = ctx.request.body
  const where = { course_id, class_id }
  const data = await ClassCourse.findOne({ where })
  if (!data) { return }

  await ClassCourse.destroy({ where })
  ctx.status = 200
})

module.exports = { classes_courses }