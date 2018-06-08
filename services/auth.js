const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const usersService = require('../routes/users/service')
const General = require('./general')
const config = require('../config')

const getToken = (authorization = '') => {
  if (authorization.split(' ')[0].toLowerCase() === 'bearer') {
    return authorization.split(' ')[1]
  }
  return null
}

module.exports = {
  /**
   * Koa middleware: Authenticate the user credentials
   * @param {String} id user ID
   * @param {String} password user password
   * @param {String} token token from the authorization section of the request headers
   */
  protect: async (ctx, next) => {
    try {
      const token = getToken(ctx.request.headers.authorization)
      let id = ''
      let password = ''

      // If token exists, get user credentials from the decoded token
      if (token) {
        const parsed = jwt.verify(token, config.tokenSecret)
        id = parsed.id
        password = parsed.password
      }

      // Always try to get the user by id
      const user = await usersService.getOneUser(id)

      // If the id matches a real user
      const isCorrect = user && bcrypt.compareSync(password, user.password)

      if (isCorrect) {
        // Authentication passed
        ctx.state.currentUserID = user.dataValues.id
        ctx.state.isAdmin = user.dataValues.role_id === 0 ? true : false
        await next()
      } else {
        ctx.status = 401
        ctx.body = 'Protected resource, use Authorization header to get access\n'
      }
    } catch (err) {
      // When token is given but invalid
      if (err.message === 'invalid signature') {
        ctx.status = 401
        ctx.body = err.message
      } else {
        throw err
      }
    }
  },
  /**
   * Used in a protected route to check if the current operation is operated by a valid user 
   * If the operating user is authorized, run the callback function
   * If not, reject the request with 403 state code 
   * @param {Object} Model The model being modified
   * @param {Object} ctx The Koa context object
   * @param {function} callback The callback function for authorized user
   * @returns {Void} void
   * */  
  isAuthorized: async (ctx, Model, callback) => {
    try {
      const data = await Model.findOne({ where: { id: ctx.params.id } })

      // Nothing found to update, return 404
      if (!data) { return }

      // Only the owner or admin user can update
      if (data.dataValues.user_id === ctx.state.currentUserID
        || data.dataValues.teacher_id === ctx.state.currentUserID
        || data.dataValues.requestor_id === ctx.state.currentUserID
        || ctx.state.isAdmin
      ) {
        await callback(data)
      } else {
        ctx.status = 403
      }
    } catch (err) {
      General.logError(ctx, err)
    }
  }
}