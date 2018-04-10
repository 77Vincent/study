import User from './user'
import Major from './major'
import Course from './course'
import Role from './role'
import User_Major from './user_major'
import Course_Major from './course_major'

// Relations
User.belongsTo(Role)

User.belongsToMany(Major, {through: 'user_major'})
Major.belongsToMany(User, {through: 'user_major'})

Course.belongsToMany(Major, {through: 'course_major'})
Major.belongsToMany(Course, {through: 'course_major'})

export {
  User,
  Major,
  Role,
  Course,
  User_Major,
  Course_Major,
}