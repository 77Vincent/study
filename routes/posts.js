import Router from 'koa-router'

import c from '../config'
import { Post, Picture, Comment } from '../models'
import { fn } from '../utils'

export const posts = Router()

const filters = [ 'user_id' ]

posts.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let filter = fn.objToObjGroupsInArr(qs, filters)

    const data = await Post.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { $and: filter },
    })
    data.map(each => {
      const { id } = each.dataValues
      each.dataValues.pictures_url = fn.getDomain(`/api/posts/${id}/pictures`) 
      each.dataValues.comments_url = fn.getDomain(`/api/posts/${id}/comments`) 
    })

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
    data.dataValues.comments_url = fn.getDomain(`/api/posts/${id}/comments`) 

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

posts.get('/:id/comments', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    const id = ctx.params.id
    const data = await Comment.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { post_id: id } 
    })

    ctx.status = 200
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    ctx.throw(500, err)
  }
})
