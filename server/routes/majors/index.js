import Router from 'koa-router';
const router = Router();
router.get('/info',async (ctx, next) => {
  let data = await getUserInfo()
  ctx.status = 200
  ctx.body = {
    userInfo: data,
    message: 'get info success'
  }
})

router.post('/info',async(ctx, next) => {
  
})
export default router