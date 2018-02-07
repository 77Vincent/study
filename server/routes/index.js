import Router from 'koa-router';
import majors from './majors';
import teachers from './teachers';
import users from './users';
const router = Router();

// routes表示的是路由的嵌套处理
router.use('/api/student', majors.routes());
router.use('/api/teachers', teachers.routes());
// user 模块做登陆登出校验操作
router.use('/api/user', users.routes());

export default router;