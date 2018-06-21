const Sequelize = require('sequelize')
const Database = require('../database')

module.exports = Database.define('portfolio', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  path: {
    type: Sequelize.STRING,
  },
}, {
  paranoid: true,
})
