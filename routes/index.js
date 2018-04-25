import Router from 'koa-router'

import './classes'
import './comments'
import './courses'
import './majors'
import './messages'
import './pictures'
import './posts'
import './roles'
import './schedules'
import './sessions'
import './tags'
import './users'

const router = Router()

// Automatically use each imported router
module.children.map(item => {
  const name = Object.keys(item.exports)[0] 
  if (name !== 'url') {
    router.use(`/api/${name}`, item.exports[name].routes())
  }
})

export default router


/*
 * Never delete these comments, these are for API documentation generation !!!
 */

/** 
 * @api {get} /cities/CN/cities.json Cities list
 * @apiGroup Locations 
 * @apiSuccess (200) {object[]} void Cities list
 */

/** 
 * @api {get} /cities/CN/provinces.json Provinces list
 * @apiGroup Locations 
 * @apiSuccess (200) {object[]} void Provinces list
 */

/** 
 * @api {get} /countries.json Countries list
 * @apiGroup Locations 
 * @apiSuccess (200) {object[]} void Countries list
 */