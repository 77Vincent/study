const Sequelize = require('sequelize')
const Database = require('..//database')

module.exports = Database.define('class', {
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
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 1 
  },
  finished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false    
  }
})
