import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('user_major', {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  major_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
})