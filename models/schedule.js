import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('schedule', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  label: {
    type: Sequelize.STRING,
  },
  quota: {
    type: Sequelize.TINYINT,
    defaultValue: 1
  },
  finished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  paranoid: true
})
