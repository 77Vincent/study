const Sequelize = require('sequelize')
const Database = require('../services/database')

module.exports = Database.define('events', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  is_recurring: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})
