const User = require('./user')
const Major = require('./major')
const Course = require('./course')
const Post = require('./post')
const Picture = require('./picture')
const Comment = require('./comment')
const Schedule = require('./schedule')
const Tag = require('./tag')
const Message = require('./message')
const Class = require('./class')
const Order = require('./order')
const Avatar = require('./avatar')
const School = require('./school')
const Country = require('./country')
const Place = require('./place')
const Portfolio = require('./portfolio')

// Table Relationship
Course.belongsTo(User)
Post.belongsTo(User)
Picture.belongsTo(Post)
Tag.belongsTo(User)

User.belongsTo(Avatar)
User.belongsTo(Portfolio)

Class.belongsTo(Schedule)
Class.belongsTo(User)

Comment.belongsTo(User)
Comment.belongsTo(Post)

Message.belongsTo(User, { as: 'Sender', foreignKey: 'sender_id' })
Message.belongsTo(User, { as: 'Recipient', foreignKey: 'recipient_id' })

Schedule.belongsTo(User, { as: 'Teacher', foreignKey: 'teacher_id' })
Schedule.belongsTo(User, { as: 'Student', foreignKey: 'student_id' })

Order.belongsTo(User, { as: 'Requestor', foreignKey: 'requestor_id' })
Order.belongsTo(User, { as: 'Recipient', foreignKey: 'recipient_id' })

Class.belongsToMany(Course, { through: 'class_course' })
Course.belongsToMany(Class, { through: 'class_course' })

User.belongsToMany(Major, { through: 'user_major' })
Major.belongsToMany(User, { through: 'user_major' })

User.belongsToMany(Country, { through: 'user_country' })
Country.belongsToMany(User, { through: 'user_country' })

User.belongsToMany(School, { through: 'user_school' })
School.belongsToMany(User, { through: 'user_school' })

User.belongsToMany(Place, { through: 'user_place' })
Place.belongsToMany(User, { through: 'place_user' })

User.belongsToMany(User, { as: 'Follower', through: 'follower_following', foreignKey: 'follower_id' })
User.belongsToMany(User, { as: 'Following', through: 'follower_following', foreignKey: 'following_id' })

Course.belongsToMany(Major, { through: 'course_major' })
Major.belongsToMany(Course, { through: 'course_major' })

module.exports = {
  User,
  Major,
  Course,
  Post,
  Comment,
  Picture,
  Schedule,
  Tag,
  Message,
  Class,
  Order,
  Avatar,
  School,
  Country,
  Place,
  Portfolio,
}
