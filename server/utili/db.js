import Sequelize from 'sequelize'
import config from '../config'

export default new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  timezone: '+08:00',
  define: {
    underscored: true,
    freezeTableName: true,
    collate: 'utf8_general_ci',
    charset: 'utf8'
  },
  dialectOptions: {
    ssl: false,
  }
})
