import Router from 'koa-router'

import { User } from '../models'
import { fn, db, oauth } from '../utils'
import c from '../config.js'

export const users = Router()

const FF = db.model('follower_following')
const ST = db.model('student_teacher')
const UM = db.model('user_major')
const urls = ['followers', 'followings', 'students', 'teachers']
const filters = [
  'role_id',
  'gender',
  'place',
  'province',
  'city',
  'country',
  'id',
  'mobilephone',
  'active',
  'available'
]
const sortings = ['cost']

users.get('/', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let filter = fn.objToObjGroupsInArr(qs, filters)
    let sorting = []

    for (let key in qs) {
      // ASC as default order
      if (sortings.indexOf(key) !== -1) {
        qs[key] = qs[key] === 'DESC' ? 'DESC' : 'ASC'
        sorting.push([key, qs[key]])
      }
    }

    // this part is for majors filtering
    // if majors is given in the querystring then do the follow
    if (qs.majors) {
      const users_id = await UM.findAll({
        where: { major_id: qs.majors.split(',') }
      })
      filter.push({ id: users_id.map(user => user.dataValues.user_id) })
    }

    let data = await User.findAll({ 
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { $and: filter },
      order: sorting,
      attributes: { exclude: ['password'] }
    })

    // Add other fields to response data
    for (let i = 0; i < data.length; i++) {
      let current = data[i].dataValues
      let followers = await FF.findAll({ where: { following_id: current.id } })
      let followings = await FF.findAll({ where: { follower_id: current.id } })
      let majors = await UM.findAll({ where: { user_id: current.id } })

      current.majors = majors.map(major => major.major_id)
      current.followers = followers.length
      current.followings = followings.length
      current.posts_url = fn.getDomain(`/api/posts?user_id=${current.id}`) 

      urls.map(url => {
        current[`${url}_url`] = fn.getDomain(`/api/users/${current.id}/${url}`)
      })
    }

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.get('/:id', async (ctx) => {
  try {
    let id = ctx.params.id
    let data = await fn.getUser(id, { attributes: { exclude: ['password'] } })
    let dv = data.dataValues
    
    let followers = await FF.findAll({ where: { following_id: id } })
    let followings = await FF.findAll({ where: { follower_id: id } })
    let majors = await UM.findAll({ where: { user_id: id } })

    dv.majors = majors.map(major => major.major_id)
    dv.followers = followers.length
    dv.followings = followings.length
    dv.posts_url = fn.getDomain(`/api/posts?user_id=${id}`) 

    urls.map(url => {
      dv[`${url}_url`] = fn.getDomain(`/api/users/${id}/${url}`)
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.get('/:id/students', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await ST.findAll({ where: { teacher_id: ctx.params.id } })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.student_id) }
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.get('/:id/teachers', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await ST.findAll({ where: { student_id: ctx.params.id } })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.teacher_id) }
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.get('/:id/followers', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await FF.findAll({
      where: { following_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.follower_id) }
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.get('/:id/followings', async (ctx) => {
  try {
    const qs = fn.parseQuerystring(ctx.request.querystring)
    let data = await FF.findAll({
      where: { follower_id: ctx.params.id }
    })

    data = await User.findAll({
      limit: c.queryLimit,
      offset: fn.getOffset(fn.getPositiveInt(qs.page), c.queryLimit),
      where: { id: data.map(item => item.dataValues.following_id) }
    })

    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.put('/', async (ctx) => {
  try {
    const { name, mobilephone, password } = ctx.request.body
    const user = await User.create({ name, mobilephone, password })
    const data = await fn.getUser(user.id, {
      attributes: { exclude: ['password'] }
    })
    const { token, expiresIn } = oauth.signToken(data)
    ctx.cookies.set('user_info', token, {
      overwrite: true,
      maxAge: expiresIn
    })
    ctx.status = 201
    ctx.body = fn.prettyJSON(data) 
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.post('/:id', async (ctx) => {
  try {
    const user_id = ctx.params.id
    let values = ctx.request.body

    await UM.destroy({
      where: { user_id }
    })
    values.majors.map(async major_id => {
      await UM.create({ user_id, major_id })
    })
    await db.sync()
    let data = await fn.getUser(user_id)
    // Delete majors because it's not updated here
    delete values.majors
    data = await data.update(values)
    // do not send password to client
    delete data.dataValues.password
    ctx.status = 200
    ctx.body = fn.prettyJSON(data)
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

users.delete('/:id', async (ctx) => {
  try {
    await User.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.cookies.set('user_info', null)
    ctx.status = 200
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})
