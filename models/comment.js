import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  content: {
    type: Sequelize.STRING,
  }
}, {
  paranoid: true
})
