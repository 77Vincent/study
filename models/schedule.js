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
  teacher_id: {
    type: Sequelize.INTEGER,
  },
  student_id: {
    type: Sequelize.INTEGER,
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
