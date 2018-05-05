const Database = require('..//database.js')
const rq = require('request-promise-native')
const c = require('../config')

const { dummyUsers } = require('./data/users')
const { dummyMajors } = require('./data/majors')
const { dummyCourses } = require('./data/courses')
const { dummyPosts } = require('./data/posts')
const { dummyPictures } = require('./data/pictures')
const { dummyComments } = require('./data/comments')
const { dummySchedules } = require('./data/schedules')
const { dummyClasses } = require('./data/classes')
const { dummyMessages } = require('./data/messages')
const { dummyTags } = require('./data/tags')
const { dummyOrders } = require('./data/orders')
const { dummyAvatars } = require('./data/avatars')

const { Role } = require('../models')

const url = `${c.protocol}://${c.host}:${c.port}/api`
const modules = module.children

const run = async () => {
  try {
    await Database.dropAllSchemas()
    await Database.sync({ force: true })

    await Role.bulkCreate([{ label: 'admin' }, { label: 'teacher' }, { label: 'student' }])

    // Create base tables
    for (let r = 0; r < modules.length; r++) {
      let current = modules[r].exports
      let name = Object.keys(current)[0]

      if (name.indexOf('dummy') !== -1) {
        let resource = name.slice(5).toLowerCase()
        for (let i = 0; i < current[name].length; i++) {
          await rq({ method: 'PUT', url: `${url}/${resource}`, body: current[name][i], json: true })
        }
      }
    }

    // Create relationship tables
    await Database.model('follower_following').bulkCreate([
      { follower_id: 1, following_id: 2 }, { follower_id: 1, following_id: 3 }, { follower_id: 1, following_id: 4 },
      { follower_id: 2, following_id: 3 }, { follower_id: 2, following_id: 1 }, { follower_id: 3, following_id: 4 },
      { follower_id: 3, following_id: 2 }, { follower_id: 4, following_id: 1 }
    ])
    await Database.model('user_major').bulkCreate([
      { user_id: 2, major_id: 1 }, { user_id: 2, major_id: 2 }, { user_id: 2, major_id: 3 },
      { user_id: 2, major_id: 4 }, { user_id: 3, major_id: 5 }, { user_id: 4, major_id: 6 },
      { user_id: 5, major_id: 2 }, { user_id: 5, major_id: 3 }, { user_id: 6, major_id: 6 },
    ])
    await Database.model('course_major').bulkCreate([
      { course_id: 1, major_id: 1 }, { course_id: 1, major_id: 2 }, { course_id: 1, major_id: 3 },
      { course_id: 1, major_id: 4 }, { course_id: 2, major_id: 3 }, { course_id: 2, major_id: 6 },
      { course_id: 3, major_id: 3 }, { course_id: 3, major_id: 5 }, { course_id: 4, major_id: 4 },
      { course_id: 5, major_id: 5 }, { course_id: 6, major_id: 6 }, { course_id: 6, major_id: 1 },
    ])
    await Database.model('class_course').bulkCreate([
      { class_id: 1, course_id: 1 }, { class_id: 1, course_id: 2 }, { class_id: 1, course_id: 3 },
      { class_id: 2, course_id: 1 }, { class_id: 2, course_id: 3 }, { class_id: 2, course_id: 4 },
      { class_id: 3, course_id: 3 }, { class_id: 3, course_id: 4 }, { class_id: 4, course_id: 4 },
      { class_id: 4, course_id: 5 }, { class_id: 4, course_id: 6 }, { class_id: 4, course_id: 7 },
      { class_id: 5, course_id: 1 }, { class_id: 5, course_id: 3 }, { class_id: 6, course_id: 2 },
      { class_id: 6, course_id: 4 }, { class_id: 6, course_id: 6 }, { class_id: 7, course_id: 2 },
      { class_id: 7, course_id: 5 }, { class_id: 7, course_id: 6 }, { class_id: 8, course_id: 1 },
      { class_id: 8, course_id: 7 }, { class_id: 9, course_id: 3 }, { class_id: 9, course_id: 4 },
      { class_id: 9, course_id: 7 }, { class_id: 10, course_id: 1 }, { class_id: 10, course_id: 5 },
      { class_id: 10, course_id: 6 },
    ])

    Database.close()
  } catch (err) {
    console.error('init Error', err)
  }
}
run()