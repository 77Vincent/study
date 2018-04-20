import Router from 'koa-router'

import { Schedule, Course } from '../models'
import { db, fn } from '../utils'
import c from '../config'

export const schedules = Router()

const SC = db.model('schedule_course')
const filters = ['teacher_id', 'student_id']
const urls = ['courses']

schedules.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    const filter = fn.objToObjGroupsInArr(qs, filters)
    const page = !isNaN(qs.page) && qs.page > 0 ? qs.page : 1

    const data = await Schedule.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(page, c.queryLimit),
      where: { $and: filter }
    })

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      let current = data[i].dataValues

      urls.map(each => {
        current[`${each}_url`] = fn.getDomain(`/api/schedules/${current.id}/${each}`)
      })
    }

    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

schedules.get('/:id', async (ctx) => {
  try {
    let { id } = ctx.params
    const data = await Schedule.findOne({ where: { id } })

    urls.map(each => {
      data.dataValues[`${each}_url`] = fn.getDomain(`/api/schedules/${id}/${each}`)
    })

    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

schedules.get('/:id/courses', async (ctx) => {
  try {
    const courses_id = await SC.findAll({
      where: { schedule_id: ctx.params.id }
    })
    const data = await Course.findAll({
      where: { id: courses_id.map(item => item.dataValues.course_id) }
    })
    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})
