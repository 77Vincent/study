import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('class', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  start: {
    type: Sequelize.DATE,
  },
  end: {
    type: Sequelize.DATE,
  },
  length: {
    type: Sequelize.DOUBLE,
    defaultValue: 1
  },
  finished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false    
  }
})
