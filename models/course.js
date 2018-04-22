import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('course', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING
  }
}, {
  paranoid: true,
  timestamps: false
})
