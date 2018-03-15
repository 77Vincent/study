import Sequelize from 'sequelize'
import { db } from '../utili'

export default db.define('curriculum', {
  user_id: {
    type: Sequelize.UUIDV4,
    allowNull: false
  },
  teacher_id: {
    type: Sequelize.UUIDV4,
    allowNull: false
  }
})
