const Sequelize = require('sequelize')
const Database = require('../services/database')

module.exports = Database.define('school', {
  id: {
    type: Sequelize.SMALLINT,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  website: {
    type: Sequelize.STRING,
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
  country_code: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
})
