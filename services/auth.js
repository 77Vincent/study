const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const usersService = require('../routes/users/service')
const c = require('../config')

const getToken = (authorization = '') => {
  if (authorization.split(' ')[0].toLowerCase() === 'bearer') {
    return authorization.split(' ')[1]
  }
  return null
}

module.exports = {
  /**
   * Koa middleware: authenticate the user credentials
   * @param {string} id user ID
   * @param {string} password user password
   * @param {string} token token from the authorization section of the request headers
   */
  authenticate: async (ctx, next) => {
    try {
      let { id, password } = ctx.request.body
      const token = getToken(ctx.request.headers.authorization)

      // Authenticate credentials
      // Token first, use credentials from decoded token on proior
      if (token) {
        const parsed = jwt.verify(token, c.tokenSecret) 
        id = parsed.id
        password = parsed.password
      }

      // Always try to get the user by id
      const user = id ? await usersService.getOneUser(id) : null

      // If the id matches a real user
      const isValid = user 
        // Check password 
        && (bcrypt.compareSync(password, user.password) || password === user.password)
        // Users can only modify their own data or sign in as admin
        && (String(ctx.params.id) === String(user.dataValues.id) || user.dataValues.role_id === 1)

      if (isValid) {
        // Authentication passed
        ctx.state = { user }
        await next()
      } else {
        ctx.status = 401
        ctx.body = 'Protected resource, use Authorization header to get access\n'
      }
    } catch (err) {
      // When token is given but invalid
      if (err.message === 'invalid signature') {
        ctx.status = 403
        ctx.body = err.message
      } else {
        throw err
      }
    }
  }
}