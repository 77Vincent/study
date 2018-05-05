const Sequelize = require('sequelize')
const Database = require('..//database')

module.exports = Database.define('avatar', {
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
  paranoid: true
})
