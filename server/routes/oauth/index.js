import jwt from 'jsonwebtoken'
import config from '../../config/jwt.json'

//生成token
const signToken = (user) => {
  console.log('signToken', user.role)

  const token = jwt.sign({
    user_info: {
      user_id: user.data.id,
      is_student: user.role
    }
  }, config.jwt_secret, {
    expiresIn: config.expiresIn
  })
  return {
    token,
    expiresIn: config.expiresIn
  }
}

//检查并更新token
const checkToken = async (ctx) => {
  const user_info = await ctx.cookies.get('user_info') // cookie里面的token
  if (user_info) {
    jwt.verify(user_info, config.jwt_secret, function (err, decoded) {
      ctx.decoded = decoded && decoded.user_info
    })
  }
}

export {
  signToken,
  checkToken
}