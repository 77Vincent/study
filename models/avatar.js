const Sequelize = require('sequelize')
const Database = require('../services/database')

module.exports = Database.define('avatar', {
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
