import User from './user'
import Major from './major'
import Role from './role'
import User_Major from './user_major'

// Relations
User.belongsTo(Role)
User.belongsToMany(Major, {through: 'user_major'})
Major.belongsToMany(User, {through: 'user_major'})

export {
  User,
  Major,
  Role,
  User_Major
}