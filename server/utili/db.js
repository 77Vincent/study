import Sequelize from 'sequelize'
import c from '../config'

export default new Sequelize(c.dbName, c.dbUser, c.dbPassword, {
  host: c.host,
  dialect: c.db,
  port: c.dbPort,
  timezone: c.dbTimezone,
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
