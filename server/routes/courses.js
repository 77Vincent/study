import Router from 'koa-router'

import { Course, Major, Course_Major } from '../models'
import { fn } from '../utili'
import c from '../config'

export const courses = Router()

/** 
 * Fetch all courses
 * @method GET
 * @returns {object} all courses
 */
courses.get('/', async (ctx, next) => {
  try {
    const data = await Course.findAll({
      limit: c.limit,
      include: [{ model: Major, attributes: ['id'] }]
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
 * @returns {object} the created course
 */
courses.put('/', async (ctx, next) => {
  try {
    const { label, description, major_id } = ctx.request.body
    const course = await Course.create({ label, description })
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

