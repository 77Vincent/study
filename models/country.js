const Sequelize = require('sequelize')
const Database = require('../database')

module.exports = Database.define('country', {
  id: {
    type: Sequelize.SMALLINT,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
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
