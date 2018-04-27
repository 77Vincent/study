import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('role', {
  id: {
    primaryKey: true,
    type: Sequelize.TINYINT,
    autoIncrement: true,
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false, 
    unique: true
  }
}, {
  timestamps: false
})
