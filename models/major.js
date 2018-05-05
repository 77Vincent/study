const Sequelize = require( 'sequelize')
const Database = require( '../database')

module.exports = Database.define('major', {
  id: {
    type: Sequelize.TINYINT,
    autoIncrement: true,
    unique: true,
    primaryKey: true
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
})
