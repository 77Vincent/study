import Sequelize from 'sequelize'
import c from '../config'

export default new Sequelize(c.databaseName, c.databaseUser, c.databasePassword, {
  host: c.host,
  dialect: c.database,
  port: c.databasePort,
  timezone: c.databaseTimezone,
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
