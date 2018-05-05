const jwt = require('jsonwebtoken')
const c = require('../config')

const secret = c.tokenSecret
const timeout = c.cookiesTimeout 

module.exports = {
  /**
   * Create token
   * @param {Object} user 
   * @return {Object} token and expire time in millisecond 
   */
  signToken (user) {
    const token = jwt.sign({
      user_info: user.id
    }, secret, {
      expiresIn: timeout
    })

    return {
      token,
      expiresIn: timeout
    }
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