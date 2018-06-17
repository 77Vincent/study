const Sequelize = require('sequelize')
const Database = require('../database')

module.exports = Database.define('schedule', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  label: {
    type: Sequelize.STRING,
  },
  quota: {
    type: Sequelize.TINYINT,
    allowNull: false,
    defaultValue: 1,
  },
  finished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  paranoid: true,
})
