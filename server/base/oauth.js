import jwt from 'jsonwebtoken'

const config = {
  secret: 'Jessie',
  timeout: 1200000
}

/**
 * Create token
 * @param {Object} user 
 * @return {Object} token and expire time in millisecond 
 */
const signToken = (user) => {
  const token = jwt.sign({
    user_info: user.id
  }, config.secret, {
    expiresIn: config.timeout
  })

  return {
    token,
    expiresIn: config.timeout
  }
}

/**
 * Check and get token if exist
 * @param {Object} ctx 
 * @return {String} user ide
 */
const verifyToken = async (ctx) => {
  const user_info = await ctx.cookies.get('user_info')

  if (user_info) {
    return jwt.verify(user_info, config.secret)
  }
}

export {
  signToken,
  verifyToken 
}