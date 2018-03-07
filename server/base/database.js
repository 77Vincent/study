// Database configurations

import Sequelize from 'sequelize'

const databaseName = 'xfolio'
const username = 'root'
const password = 'root'

export default new Sequelize(databaseName, username, password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  underscored: true,
  timezone: '+08:00',
  dialectOptions: {
    ssl: false,
  }
})