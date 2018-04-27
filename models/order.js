import Sequelize from 'sequelize'
import { Db } from '../utils'

export default Db.define('order', {
  id: {
    type: Sequelize.UUIDV1,
    primaryKey: true
  },
  paid_at: {
    type: Sequelize.DATE,
  },
  payment_method: {
    type: Sequelize.TINYINT,
    allowNull: false,
  },
  total_price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0 
  },
  unit_price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0 
  },
  length: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 1 
  },
  income: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0 
  },
  refund: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0 
  }
}, {
  paranoid: true
})
