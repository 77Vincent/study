import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('schedule', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  label: {
    type: Sequelize.STRING,
  },
  teacher_id: {
    type: Sequelize.INTEGER,
  },
  student_id: {
    type: Sequelize.INTEGER,
  }
})
