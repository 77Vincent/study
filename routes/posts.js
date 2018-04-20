import Router from 'koa-router'

import c from '../config'
import { Post, Picture } from '../models'
import { fn } from '../utils'

export const posts = Router()

posts.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    const data = await Post.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
    })
    for (let i = 0; i < data.length; i++) {
      let current = data[i].dataValues
      current.pictures_url = fn.getDomain(`/api/posts/${current.id}/pictures`) 
    }

    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

posts.get('/:id', async (ctx) => {
  try {
    const id = ctx.params.id
    const data = await Post.findOne({ where: { id } })
    data.dataValues.pictures_url = fn.getDomain(`/api/posts/${id}/pictures`) 

    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})

posts.get('/:id/pictures', async (ctx) => {
  try {
    const id = ctx.params.id
    const data = await Picture.findAll({ where: { post_id: id } })

    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})
