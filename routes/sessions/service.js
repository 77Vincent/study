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
  },
  auth: async (id = '', password = '', token = '') => {
    try {
      let user = {}

      if (id && password) {
        // Sign in with user id and password 
        user = await usersService.getOneUser(id)
        if (user && bcrypt.compareSync(password, user.password)) {
          return user
        } else {
          return false
        }
      } else if (token) {
        // Sign in with token
        id = jwt.verify(token, c.tokenSecret).user_info
        user = await usersService.getOneUser(id)
        if (user) {
          return user
        } else {
          return false
        }
      } else {
        // Sign in without any credentials
        return false
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
    const token = jwt.sign({ user_info }, secret, { expiresIn }) 
    return { token, expiresIn }
  }
}