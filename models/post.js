import Sequelize from 'sequelize'
import { db } from '../utils'

export default db.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  text: {
    type: Sequelize.STRING,
  },
  pictures: {
    type: Sequelize.STRING
  }
}, {
  paranoid: true
})
