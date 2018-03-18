import Sequelize from 'sequelize'
import { db } from '../utili'

export default db.define('user_major', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  major_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
})