'use strict'
// Database configurations

import Sequelize from 'sequelize'

const databaseName = 'xfolio'
const username = 'root'
const password = 'root'

const sequelize = new Sequelize(databaseName, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  underscored: true,
  timezone: '+08:00',
  define: {
    freezeTableName: true,
    charset: 'utf8'
  },
  dialectOptions: {
    ssl: false,
  }
})

export default sequelize