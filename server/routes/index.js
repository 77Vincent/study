import Router from 'koa-router'

import majors from './majors'
import users from './users'
import sessions from './sessions'

const router = Router()

router.use('/api/users', users.routes())
router.use('/api/majors', majors.routes())
router.use('/api/sessions', sessions.routes())

export default router