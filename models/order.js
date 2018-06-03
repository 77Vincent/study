const Sequelize = require('sequelize')
const Database = require('../database')
const Generral = require('../services/general')

module.exports = Database.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  isExpired: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isReceived: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  expired_at: {
    type: Sequelize.DATE,
    defaultValue: Generral.timer(1)
  },
  paid_at: {
    type: Sequelize.DATE,
  },
  received_at: {
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
  isRefunded: {
    type: Sequelize.BOOLEAN,
    defaultValue: 0 
  }
}, {
  paranoid: true
})
