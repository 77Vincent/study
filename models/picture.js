import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('picture', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  url: {
    type: Sequelize.STRING
  }
}, {
  paranoid: true,
  timestamps: false
})
