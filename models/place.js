const Sequelize = require('sequelize')
const Database = require('../services/database')

module.exports = Database.define('place', {
  id: {
    type: Sequelize.SMALLINT,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  en: {
    type: Sequelize.STRING,
    unique: true,
  },
  cn: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  pinyin: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
})
