import jwt from 'jsonwebtoken'

const config = {
  "secret": "Edmond",
  "timeout": 1200000
}

/**
 * Create token
 * @param {Object} user 
 * @return {Object} token and expire time in millisecond 
 */
const signToken = (user) => {
  const token = jwt.sign({
    user_info: user.data.id
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
 * @param {any} ctx 
 * @return {void}
 */
const verifyToken = async (ctx) => {
  const user_info = await ctx.cookies.get('user_info')

  if (user_info) {
    jwt.verify(user_info, config.secret, function (err, decoded) {
      ctx.decoded = decoded && decoded.user_info
    })
  }
}

export {
  signToken,
  verifyToken 
}