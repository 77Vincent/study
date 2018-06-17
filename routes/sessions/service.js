const jwt = require('jsonwebtoken')

const c = require('../../config')

module.exports = {
  /**
   * Sign a jsom web token
   * @param {Object} credentials User Credentials
   * @return {Object} token
   */
  signToken(credentials = {}) {
    return jwt.sign(credentials, c.tokenSecret, { expiresIn: c.cookiesTimeout })
  },
}
