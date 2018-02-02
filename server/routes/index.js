import Router from 'koa-router';
import majors from './majors';
import teachers from './teachers';
import users from './users';
const router = Router();

// routes表示的是路由的嵌套处理
router.use('/api/majors', majors.routes());
router.use('/api/goods', teachers.routes());
router.use('/api/users', users.routes());

export default router;