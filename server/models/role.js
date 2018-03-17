import Sequelize from 'sequelize'
import { db } from '../utili'

export default db.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    unique: true
  }
}, {
  timestamps: false
})
