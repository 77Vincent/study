import Router from 'koa-router'

import { Course, Major } from '../models'
import { fn } from '../utili'
import c from '../config'

export const courses = Router()

/** 
 * Fetch all courses
 * @method GET
 * @param {object} ctx - koa http context object
 * @returns {object} All courses
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
 * @param {object} ctx - koa http context object
 * @returns {object} the created course
 */
// courses.put('/', async (ctx, next) => {
//   try {
//     const { label, description, major_id } = ctx.request.body
//     const course = await Course.create({ label, description })
//   } catch (err) {
//     ctx.throw(500, err)
//   }
// })

/**
 * Delete a course
 * @method DELETE
 * @param {object} ctx - koa http context object
 * @returns {void}
 */
courses.delete('/:id', async (ctx) => {
  try {
    await User.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})

