import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('avatar', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  path: {
    type: Sequelize.STRING
  }
}, {
  paranoid: true
})
