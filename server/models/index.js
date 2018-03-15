import User from './user'
import Major from './major'
import User_Major from './user_major'

// Relations
User.belongsToMany(Major, {
  through: 'user_major' 
})

Major.belongsToMany(User, {
  through: 'user_major' 
})

export {
  User,
  Major,
  User_Major
}