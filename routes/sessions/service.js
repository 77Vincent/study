const jwt = require('jsonwebtoken')

const c = require('../../config')

module.exports = {
  /**
   * Sign a jsom web token
   * @param {object} credentials User Credentials
   * @return {object} token
   */
  signToken (credentials = {}) {
    return jwt.sign(credentials, c.tokenSecret, { expiresIn: c.cookiesTimeout }) 
  }
}