const Sequelize = require( 'sequelize')
const Database = require( '../database')

module.exports = Database.define('school', {
  id: {
    type: Sequelize.TINYINT,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  website: {
    type: Sequelize.STRING,
    unique: true
  },
  en: {
    type: Sequelize.STRING,
    unique: true
  },
  cn: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  country: {
    type: Sequelize.STRING,
  }
}, {
  timestamps: false
})
