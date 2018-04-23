import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('class', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATE,
  },
  length: {
    type: Sequelize.DOUBLE
  },
  finished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false    
  }
}, {
  paranoid: true
})
