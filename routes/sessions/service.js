const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const c = require('../../config')
const usersService = require('../users/service')

const secret = c.tokenSecret
const expiresIn = c.cookiesTimeout 

module.exports = {
  auth: async (id = '', password = '', user_info = '') => {
    let user = {}
    if (id && password) {
      user = await usersService.getOneUser(id)
      if (user && bcrypt.compareSync(password, user.password)) {
        return user
      } else {
        return false
      }
    } else if (user_info) {
      // Sign in with credentials in cookies if exist 
      user = await usersService.getOneUser(user_info)
      if (user) {
        return user
      } else {
        return false
      }
    } else {
      // Sign in without any credentials
      return false
    }
  },
  /**
   * Create token
   * @param {Object} user 
   * @return {Object} token and expire time in millisecond 
   */
  signToken (user) {
    const token = jwt.sign({ user_info: user.username }, secret, { expiresIn }) 
    return { token, expiresIn }
  },
  /**
   * Check and get token if exist
   * @param {Object} ctx 
   * @return {Object} user id
   */
  verifyToken: async (ctx) => {
    const user_info = await ctx.cookies.get('user_info')
    if (user_info) {
      return jwt.verify(user_info, secret)
    }
  }
}