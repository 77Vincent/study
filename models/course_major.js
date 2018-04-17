import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('course_major', {
  course_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  major_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
})