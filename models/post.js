const Sequelize = require('sequelize')
const Database = require('../database')

module.exports = Database.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  content: {
    type: Sequelize.STRING,
  }
}, {
  paranoid: true
})
