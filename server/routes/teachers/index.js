import Router from 'koa-router';
const router = Router();

router.get('/info',async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    userInfo: 'test',
    message: 'get info success'
  }
})

export default router