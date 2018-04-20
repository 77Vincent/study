import Router from 'koa-router'

import { Course } from '../models'
import { db, fn } from '../utils'
import c from '../config'

export const courses = Router()

const filters = ['id', 'user_id']

courses.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    const filter = fn.objToObjGroupsInArr(qs, filters)
    const page = !isNaN(qs.page) && qs.page > 0 ? qs.page : 1

    // this part is for majors filtering
    if (qs.majors) {
      const courses_id = await db.model('course_major').findAll({
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

courses.delete('/:id', async (ctx) => {
  try {
    await Course.destroy({ where: { id: ctx.params.id } })
    ctx.status = 200
  } catch (err) {
    ctx.throw(500, err)
  }
})

