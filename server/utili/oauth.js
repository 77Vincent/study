import jwt from 'jsonwebtoken'

const secret = 'Jessie'
const timeout = 30 * 60 * 1000 

/**
 * Create token
 * @param {Object} user 
 * @return {Object} token and expire time in millisecond 
 */
const signToken = (user) => {
  const token = jwt.sign({
    user_info: user.id
  }, secret, { expiresIn: timeout })

  return {
    token,
    expiresIn: timeout
  }
}

/**
 * Check and get token if exist
 * @param {Object} ctx 
 * @return {Object} user id
 */
const verifyToken = async (ctx) => {
  const user_info = await ctx.cookies.get('user_info')

  if (user_info) {
    return jwt.verify(user_info, secret)
  }
}

export {
  signToken,
  verifyToken 
}