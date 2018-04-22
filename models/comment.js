import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('comment', {
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
