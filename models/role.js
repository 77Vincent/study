const Sequelize = require('sequelize')
const Database = require('..//database')

module.exports = Database.define('role', {
  id: {
    primaryKey: true,
    type: Sequelize.TINYINT,
    autoIncrement: true,
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false, 
    unique: true
  }
}, {
  timestamps: false
})
