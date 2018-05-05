const Sequelize = require('sequelize')
const Database = require('../database')

module.exports = Database.define('course', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING
  }
}, {
  paranoid: true,
  timestamps: false
})
