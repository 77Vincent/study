import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('role', {
  id: {
    primaryKey: true,
    type: Sequelize.STRING,
    allowNull: false, 
    unique: true
  }
}, {
  timestamps: false
})
