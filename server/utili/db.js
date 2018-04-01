import Sequelize from 'sequelize'
import config from '../config'

export default new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: '39.104.108.82',
  dialect: 'mysql',
  port: config.dbPort,
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
