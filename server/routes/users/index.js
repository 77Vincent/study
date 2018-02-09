import Router from 'koa-router';
const router = Router();
import { signToken } from '../oauth/index';
import { getAllUserInfos, register, checkPassword } from './userHandler'
router.get('/info',async (ctx, next) => {
  let data = await getAllUserInfos();
  ctx.status = 200;
  ctx.body = {
    userInfo: data,
    message: 'get info success'
  }
})

// router.post('/register', async(ctx, next) => {
//   let result = await register(ctx);
//   if(result){
//       ctx.status = 204;
//   } else {
//     ctx.status = 500;
//   }
// })
router.get('/test', async(ctx, next) => {
  console.log('decoded',ctx.decoded)
  if(true){
      ctx.body = {data:'test'}
      ctx.status = 200;
  } else {
    ctx.status = 500;
  }
})
router.post('/login',async (ctx,next) => {
  try{
    let user = await checkPassword(ctx)
    if(user){
       let {token,expiresIn} = signToken(user);
       ctx.cookies.set("user_info",token,{
         overwrite:true,
         maxAge: expiresIn
       })
      ctx.status = 200;
      ctx.body = {
        userInfo: user,
        message: 'login in success'
      }
    } else {
      ctx.status = 403;
      ctx.body = {
        message: 'password wrong'
      }
    }
  }catch(err){
    ctx.status = 500
    ctx.body ={
      message: 'backend error'
    }
    console.log('login failure', err)
  }
})
export default router