import jwt from 'jsonwebtoken';
import config from '../../config/jwt.json';
//生成token
const signToken = (user) => {
    const token = jwt.sign({
        user_id: user.id,
    }, config.jwt_secret, {expiresIn: config.expiresIn})
    console.log('token',token)
    return {token,expiresIn:config.expiresIn}
}

//检查并更新token
const checkToken = async(ctx) => {
    console.log('checkOauth')
    const token = ctx.cookies.get('user_id'); // cookie里面的token
    if(token){
        jwt.verify(token, config.jwt_secret, function(err, decoded) {
            ctx.decoded = decoded;
        })
    }
}

export {
    signToken,
    checkToken,
}