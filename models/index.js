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
import Class from './class'
import Order from './order'

// Table Relationship
User.belongsTo(Role)
Course.belongsTo(User)
Post.belongsTo(User)
Picture.belongsTo(Post)
Tag.belongsTo(User)
Class.belongsTo(Schedule)

Comment.belongsTo(User)
Comment.belongsTo(Post)

Message.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id' })
Message.belongsTo(User, { as: 'Recipient', foreignKey: 'recipient_id' })

Schedule.belongsTo(User, { as: 'Teacher', foreignKey: 'teacher_id' })
Schedule.belongsTo(User, { as: 'Student', foreignKey: 'student_id' })

Order.belongsTo(User, {as: 'Buyer', foreignKey: 'buyer_id'})
Order.belongsTo(User, {as: 'Seller', foreignKey: 'seller_id'})

Class.belongsToMany(Course, {through: 'class_course'})
Course.belongsToMany(Class, {through: 'class_course'})

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
  Post,
  Comment,
  Picture,
  Schedule,
  Tag,
  Message,
  Class,
  Order
}