import User from './user'
import Major from './major'
import Course from './course'
import Role from './role'
import User_Major from './user_major'
import Course_Major from './course_major'

// Table Relationship

// Each user has a role
User.belongsTo(Role)
// Each course has a user who created the course
Course.belongsTo(User)

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