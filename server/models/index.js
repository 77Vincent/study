import User from './user'
import User_Major from './user_major'
import Major from './major'

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