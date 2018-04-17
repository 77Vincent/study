import Router from 'koa-router'

import { Course, Course_Major } from '../models'
import { fn } from '../utils'
import c from '../config'

export const courses = Router()

/** 
 * Fetch all courses
 * @method GET
 * @returns {object} all courses
 */
courses.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    const page = !isNaN(qs.page) && qs.page > 0 ? qs.page : 1

    let filter = []
    // this part is for majors filtering
    if (qs.majors) {
      const courses_id = await Course_Major.findAll({
        where: { major_id: qs.majors.split(',') }
      })
      filter.push({ id: courses_id.map(item => item.dataValues.course_id) })
    }

    if (qs.label) {
      filter.push({
        label: { $like: `%${decodeURI(qs.label)}%` }
      })
    }

    const data = await Course.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(page, c.queryLimit),
      where: { $and: filter }
    })
    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Create a course
 * @method PUT 
 * @param {string} label
 * @param {string} description
 * @param {number} major_id
 * @param {number} user_id
 * @returns {object} the created course
 */
courses.put('/', async (ctx) => {
  try {
    const { label, description, major_id, user_id } = ctx.request.body
    const course = await Course.create({ label, description, user_id })
    await Course_Major.create({ 
      course_id: course.id,
      major_id
    })
    ctx.status = 201
    ctx.body = fn.prettyJSON(course) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

/** 
 * Update a course
 * @method PUT 
 * @param {string} label
 * @param {string} description
 * @returns {object} the updated course
 */
courses.post('/:id', async (ctx) => {
  try {
    const { id } = ctx.params
    const { label, description } = ctx.request.body
    let course = await Course.findOne({ where: { id } })
    course = await course.update({ label, description })
    ctx.status = 201
    ctx.body = fn.prettyJSON(course) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

/**
 * Delete a course
 * @method DELETE
 * @param {number} id the course id
 * @returns {void}
 */
courses.delete('/:id', async (ctx) => {
  try {
    await Course.destroy({ where: { id: ctx.params.id } })
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})
