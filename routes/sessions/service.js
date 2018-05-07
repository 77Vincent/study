const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const c = require('../../config')
const usersService = require('../users/service')

const secret = c.tokenSecret
const expiresIn = c.cookiesTimeout 

module.exports = {
  getToken(authorization = '') {
    if (authorization.split(' ')[0].toLowerCase() === 'bearer') {
      return authorization.split(' ')[1]
    }
    return null
  },
  auth: async (id = '', password = '', token = '') => {
    try {
      if (token) {
        const parsed = jwt.verify(token, c.tokenSecret) 
        id = parsed.id
        password = parsed.password
      }

      const user = id ? await usersService.getOneUser(id) : null

      if (user && (bcrypt.compareSync(password, user.password) || password === user.password)) {
        return user
      }
    } catch (err) {
      throw err
    }
  },
  /**
   * Create token
   * @param {Object} user 
   * @return {Object} token and expire time in millisecond 
   */
  signToken (user_info) {
    const token = jwt.sign(user_info, secret, { expiresIn }) 
    return token
  }
}