import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('like_teacher', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.STRING,
  },
  teacher_id: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})
