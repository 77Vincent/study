const Sequelize = require('sequelize')
const Database = require('..//database')

module.exports = Database.define('picture', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  path: {
    type: Sequelize.STRING
  }
}, {
  paranoid: true,
  timestamps: false
})
