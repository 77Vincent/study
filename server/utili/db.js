import Sequelize from 'sequelize'

const databaseName = 'xfolio'
const username = 'root'
const password = 'root'

export default new Sequelize(databaseName, username, password, {
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
