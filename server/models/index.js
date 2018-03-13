import User from './user'
import Major from './major'
import User_Major from './user_major'

User.belongsToMany(Major, {
  through: 'User_Major',
  foreignKey: 'user_id'
})

Major.belongsToMany(User, {
  through: 'User_Major',
  foreignKey: 'major_id'
})

export {
  User,
  Major,
  User_Major
}