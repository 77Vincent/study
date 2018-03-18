import Sequelize from 'sequelize'
import { db } from '../utili'

export default db.define('role', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  label: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false, 
    unique: true
  }
}, {
  timestamps: false
})
