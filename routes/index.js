const Router = require('koa-router')

const routes = [
  'classes', 'comments', 'courses', 'majors',
  'messages', 'pictures', 'posts',
  'schedules', 'sessions', 'tags', 'users',
  'orders', 'avatars', 'followers_followings',
  'users_majors', 'courses_majors', 'classes_courses'
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
 * @api {get} /resources/locale/CN/cities.json Cities list
 * @apiGroup Resources 
 * @apiSuccess (200) {object[]} void List of the recourse
 */

/** 
 * @api {get} /resources/locale/CN/provinces.json Provinces list
 * @apiGroup Resources 
 * @apiSuccess (200) {object[]} void List of the recourse
 */

/** 
 * @api {get} /resources/locale/countries.json Countries list
 * @apiGroup Resources 
 * @apiSuccess (200) {object[]} void List of the recourse
 */

/** 
 * @api {get} /resources/degrees.json Degrees list
 * @apiGroup Resources 
 * @apiSuccess (200) {object[]} void List of the recourse
 */