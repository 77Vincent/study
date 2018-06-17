const Router = require('koa-router')

const { avatars } = require('./avatars')
const { classes } = require('./classes')
const { classes_courses } = require('./classes_courses')
const { comments } = require('./comments')
const { courses } = require('./courses')
const { courses_majors } = require('./courses_majors')
const { followers_followings } = require('./followers_followings')
const { locations } = require('./locations')
const { majors } = require('./majors')
const { messages } = require('./messages')
const { orders } = require('./orders')
const { pictures } = require('./pictures')
const { posts } = require('./posts')
const { schedules } = require('./schedules')
const { schools } = require('./schools')
const { sessions } = require('./sessions')
const { tags } = require('./tags')
const { users } = require('./users')
const { users_majors } = require('./users_majors')

const router = Router({ prefix: '/api/' })

router.use('avatars', avatars.routes())
router.use('classes', classes.routes())
router.use('classes_courses', classes_courses.routes())
router.use('comments', comments.routes())
router.use('courses', courses.routes())
router.use('courses_majors', courses_majors.routes())
router.use('followers_followings', followers_followings.routes())
router.use('locations', locations.routes())
router.use('majors', majors.routes())
router.use('messages', messages.routes())
router.use('orders', orders.routes())
router.use('pictures', pictures.routes())
router.use('posts', posts.routes())
router.use('schedules', schedules.routes())
router.use('schools', schools.routes())
router.use('sessions', sessions.routes())
router.use('tags', tags.routes())
router.use('users', users.routes())
router.use('users_majors', users_majors.routes())

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

/**
 * @api {get} /resources/roles.json User roles list
 * @apiGroup Resources
 * @apiSuccess (200) {object[]} void List of the recourse
 */
