import User from './user'
import Major from './major'
import Course from './course'
import Role from './role'

// Table Relationship

// Each user has a role
User.belongsTo(Role)
// Each course has a user who created the course
Course.belongsTo(User)

User.belongsToMany(Major, {through: 'user_major'})
Major.belongsToMany(User, {through: 'user_major'})

User.belongsToMany(User, {as: 'Follower', through: 'follower_following', foreignKey: 'follower_id'})
User.belongsToMany(User, {as: 'Following', through: 'follower_following', foreignKey: 'following_id'})

Course.belongsToMany(Major, {through: 'course_major'})
Major.belongsToMany(Course, {through: 'course_major'})

export {
  User,
  Major,
  Role,
  Course,
}