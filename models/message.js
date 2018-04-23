import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('message', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  content: {
    type: Sequelize.STRING,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  recipient_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  paranoid: true
})
