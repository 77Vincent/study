import Router from 'koa-router'

import './majors'
import './users'
import './courses'
import './sessions'

const router = Router()

// Automatically use each imported router
module.children.map(item => {
  const name = Object.keys(item.exports)[0] 
  if (name !== 'url') {
    router.use(`/api/${name}`, item.exports[name].routes())
  }
})

export default router