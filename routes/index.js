const Router = require('koa-router')

const routes = [
  'classes', 'comments', 'courses', 'majors',
  'messages', 'pictures', 'posts', 'roles',
  'schedules', 'sessions', 'tags', 'users',
  'orders', 'avatars', 'hooks', 'followings',
  'users_majors', 'courses_majors'
]

const router = Router({ prefix: '/api/' })

routes.map((each) => {
  const eachRoute = require(`./${each}`)
  router.use(each, eachRoute[each].routes())
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