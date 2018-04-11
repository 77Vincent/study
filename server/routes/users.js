import Router from 'koa-router'
import Sequelize from 'sequelize'

import { User, Major, User_Major } from '../models'
import { fn, db, oauth } from '../utils'
import c from '../config.js'

const Op = Sequelize.Op
export const users = Router()

/** 
 * Fetch all users
 * @method GET
 * @param {string} role_id
 * @returns {object} all users
 */
users.get('/', async (ctx) => {
  try {
    // fields that can be filtered
    const qs = fn.parseQuerystring(ctx.request.querystring)
    const page = !isNaN(qs.page) && qs.page > 0 ? qs.page : 1

    // only use query that's included
    const filters = ['role_id', 'gender', 'place', 'location', 'majors']
    let filter = [] 
    for (let key in qs) {
      if (filters.indexOf(key) !== -1) {
        filter.push({[key]: qs[key]})
      }
    }
    const sortings = ['cost']
    let sorting = []
    for (let key in qs) {
      // ASC as default order
      qs[key] = qs[key] === 'DESC' ? 'DESC' : 'ASC'
      if (sortings.indexOf(key) !== -1) {
        sorting.push([key, qs[key]])
      }
    }

    const data = await User.findAll({ 
      limit: c.limit,
      where: { [Op.and]: filter},
      order: sorting,
      offset: page ? ( page - 1 ) * c.limit : 0,
      include: [{ model: Major, attributes: ['id'] }],
      attributes: { exclude: ['password'] }
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

/** 
 * Fetch a user
 * @method GET
 * @param {number} id - user id
 * @returns {object} the user
 */
users.get('/:id', async (ctx) => {
  try {
    const data = await fn.getUser(ctx.params.id, {
      attributes: { exclude: ['password'] }
    })
    if (data) {
      ctx.status = 200
      ctx.body = fn.prettyJSON(data) 
    } else {
      ctx.status = 204
    }
  } catch (err) {
    console.error(err)
    ctx.throw(500, err)
  }
})

/** 
 * Create a user 
 * @method PUT 
 * @param {string} name - displayed name
 * @param {string} mobilephone
 * @param {string} password
 * @returns {object} the created user
 */
users.put('/', async (ctx) => {
  try {
    const { name, mobilephone, password } = ctx.request.body
    const user = await User.create({ name, mobilephone, password })
    const data = await fn.getUser(user.id, {
      attributes: { exclude: ['password'] }
    })
    const { token, expiresIn } = oauth.signToken(data)
    ctx.cookies.set("user_info", token, {
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

/** 
 * Update a user 
 * @method POST 
 * @param {object} values - new user info
 * @returns {object} the updated user if success
 */
users.post('/:id', async (ctx) => {
  try {
    const user_id = ctx.params.id
    let values = ctx.request.body

    await User_Major.destroy({
      where: { user_id }
    })
    values.majors.map(async major_id => {
      await User_Major.create({ user_id, major_id })
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

/**
 * Delete a user
 * @method DELETE
 * @param {number} id - user id
 * @returns {void}
 */
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
