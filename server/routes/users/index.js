import Router from 'koa-router';
const router = Router();
import { getAllUserInfos, createUserInfo } from './userHandler'
router.get('/info',async (ctx, next) => {
  let data = await getAllUserInfos();
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
export default router