import Router from 'koa-router';
const router = Router();
import { signToken } from '../oauth/index';
import { getAllUserInfos, createUserInfo, checkPassword } from './userHandler'
router.get('/info',async (ctx, next) => {
  let data = await getAllUserInfos();
  ctx.cookies.set("user_id","1111111")
  ctx.status = 200;
  ctx.body = {
    userInfo: data,
    message: 'get info success'
  }
})

router.post('/info', async(ctx, next) => {
  let result = await createUserInfo(ctx);
  if(result){
      ctx.status = 204;
  } else {
    ctx.status = 500;
  }
})

router.post('/login',async (ctx,next) => {
  try{
    let user = await checkPassword(ctx)
    if(user){
       let {token,expiresIn} = await signToken(user);
       console.log(token,expiresIn)
       ctx.cookies.set("user_id",token,{
         overwrite:true,
         maxAge: expiresIn
       })
      ctx.status = 200;
      ctx.body = {
        userInfo: user,
        message: 'login in success'
      }
    }
  }catch(err){
    console.log('login filure', err)
  }
})
export default router