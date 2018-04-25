import Db from '../utils/database.js'
import rq from 'request-promise-native'
import c from '../config'

import users from './data/users'
import majors from './data/majors'
import courses from './data/courses'
import posts from './data/posts'
import classes from './data/classes'
import messages from './data/messages'
import comments from './data/comments'
import tags from './data/tags'
import schedules from './data/schedules'
import pictures from './data/pictures'

import {
  Major,
  Role,
  Course,
  Post,
  Comment,
  Picture,
  Schedule,
  Tag,
  Message,
  Class,
} from '../models'

const url = `${c.protocol}://${c.host}:${c.port}/api`;

(async () => {
  try {
    await Db.dropAllSchemas()
    await Db.sync({ force: true })

    await Role.bulkCreate([{ id: 'admin' }, { id: 'teacher' }, { id: 'student' }])
    await Major.bulkCreate(majors)
    await rq({ method: 'PUT', url: `${url}/users`, body: users[0], json: true })
    await rq({ method: 'PUT', url: `${url}/users`, body: users[1], json: true })
    await rq({ method: 'PUT', url: `${url}/users`, body: users[2], json: true })
    await rq({ method: 'PUT', url: `${url}/users`, body: users[3], json: true })
    await rq({ method: 'PUT', url: `${url}/users`, body: users[4], json: true })
    await rq({ method: 'PUT', url: `${url}/users`, body: users[5], json: true })
    await Tag.bulkCreate(tags)
    await Course.bulkCreate(courses)
    await Schedule.bulkCreate(schedules)
    await Class.bulkCreate(classes)
    await Post.bulkCreate(posts)
    await Picture.bulkCreate(pictures)
    await Message.bulkCreate(messages)
    await Comment.bulkCreate(comments)

    await Db.model('follower_following').bulkCreate([
      { follower_id: 1, following_id: 2 },
      { follower_id: 1, following_id: 3 },
      { follower_id: 1, following_id: 4 },
      { follower_id: 2, following_id: 3 },
      { follower_id: 2, following_id: 1 },
      { follower_id: 3, following_id: 4 },
      { follower_id: 3, following_id: 2 },
      { follower_id: 4, following_id: 1 }
    ])
    await Db.model('student_teacher').bulkCreate([
      { student_id: 5, teacher_id: 1 },
      { student_id: 5, teacher_id: 2 },
      { student_id: 5, teacher_id: 3 },
      { student_id: 5, teacher_id: 4 }
    ])
    await Db.model('user_major').bulkCreate([
      { user_id: 1, major_id: 1 },
      { user_id: 1, major_id: 2 },
      { user_id: 2, major_id: 3 },
      { user_id: 2, major_id: 4 },
      { user_id: 3, major_id: 5 },
      { user_id: 4, major_id: 6 }
    ])
    await Db.model('course_major').bulkCreate([
      { course_id: 1, major_id: 1 },
      { course_id: 1, major_id: 2 },
      { course_id: 1, major_id: 3 },
      { course_id: 1, major_id: 4 },
      { course_id: 2, major_id: 3 },
      { course_id: 2, major_id: 6 },
      { course_id: 3, major_id: 3 },
      { course_id: 3, major_id: 5 },
      { course_id: 4, major_id: 4 },
      { course_id: 5, major_id: 5 },
      { course_id: 6, major_id: 6 },
      { course_id: 6, major_id: 1 },
    ])
    await Db.model('class_course').bulkCreate([
      { class_id: 1, course_id: 1 },
      { class_id: 1, course_id: 2 },
      { class_id: 1, course_id: 3 },
      { class_id: 2, course_id: 2 },
      { class_id: 2, course_id: 3 },
      { class_id: 2, course_id: 4 },
      { class_id: 3, course_id: 3 },
      { class_id: 3, course_id: 4 },
      { class_id: 4, course_id: 4 },
      { class_id: 4, course_id: 5 },
      { class_id: 4, course_id: 6 },
      { class_id: 4, course_id: 7 },
      { class_id: 5, course_id: 1 },
      { class_id: 5, course_id: 3 },
      { class_id: 6, course_id: 2 },
      { class_id: 6, course_id: 4 },
      { class_id: 6, course_id: 6 },
      { class_id: 7, course_id: 2 },
      { class_id: 7, course_id: 5 },
      { class_id: 7, course_id: 6 },
      { class_id: 8, course_id: 1 },
      { class_id: 8, course_id: 7 },
      { class_id: 9, course_id: 3 },
      { class_id: 9, course_id: 4 },
      { class_id: 9, course_id: 7 },
      { class_id: 10, course_id: 1 },
      { class_id: 10, course_id: 5 },
      { class_id: 10, course_id: 6 },
    ])
    Db.close()

  } catch (err) {
    console.error('init Error', err)
  }
})()