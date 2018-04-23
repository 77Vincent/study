import User from './user'
import Major from './major'
import Course from './course'
import Role from './role'
import Post from './post'
import Picture from './picture'
import Comment from './comment'
import Schedule from './schedule'
import Tag from './tag'
import Message from './message'

// Table Relationship
User.belongsTo(Role)
Course.belongsTo(User)
Post.belongsTo(User)
Tag.belongsTo(User)
Message.belongsTo(User)

// Each comment has a user id and a post id
Comment.belongsTo(User)
Comment.belongsTo(Post)

Schedule.belongsToMany(Course, {through: 'schedule_course'})
Course.belongsToMany(Schedule, {through: 'schedule_course'})

// Each picture has a post id
Picture.belongsTo(Post)

User.belongsToMany(Major, {through: 'user_major'})
Major.belongsToMany(User, {through: 'user_major'})

User.belongsToMany(User, {as: 'Follower', through: 'follower_following', foreignKey: 'follower_id'})
User.belongsToMany(User, {as: 'Following', through: 'follower_following', foreignKey: 'following_id'})

User.belongsToMany(User, {as: 'Student', through: 'student_teacher', foreignKey: 'student_id'})
User.belongsToMany(User, {as: 'Teacher', through: 'student_teacher', foreignKey: 'teacher_id'})

Course.belongsToMany(Major, {through: 'course_major'})
Major.belongsToMany(Course, {through: 'course_major'})

export {
  User,
  Major,
  Role,
  Course,
  Post,
  Comment,
  Picture,
  Schedule,
  Tag,
  Message
}