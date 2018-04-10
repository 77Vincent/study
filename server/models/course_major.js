import Sequelize from 'sequelize'
import { db } from '../utili'

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