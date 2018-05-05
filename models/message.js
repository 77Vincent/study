const Sequelize = require('sequelize')
const Database = require('../database')

module.exports = Database.define('message', {
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
    allowNull: false,
    defaultValue: false
  }
}, {
  paranoid: true
})
