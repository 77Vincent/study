const Router = require('koa-router')

require( './classes')
require( './comments')
require( './courses')
require( './majors')
require( './messages')
require( './pictures')
require( './posts')
require( './roles')
require( './schedules')
require( './sessions')
require( './tags')
require( './users')
require( './orders')
require( './avatars')

const router = Router({
  prefix: '/api/'
})

module.children.map(item => {
  const name = Object.keys(item.exports)[0] 
  if (name !== 'url') {
    router.use(`${name}`, item.exports[name].routes())
  }
})

module.exports = router

/*
 * Never delete these comments, these are for API documentation generation !!!
 */

/** 
 * @api {get} /locale/CN/cities.json Cities list
 * @apiGroup Locations 
 * @apiSuccess (200) {object[]} void Cities list
 */

/** 
 * @api {get} /locale/CN/provinces.json Provinces list
 * @apiGroup Locations 
 * @apiSuccess (200) {object[]} void Provinces list
 */

/** 
 * @api {get} /locale/countries.json Countries list
 * @apiGroup Locations 
 * @apiSuccess (200) {object[]} void Countries list
 */