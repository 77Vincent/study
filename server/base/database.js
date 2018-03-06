// Database configurations

import Sequelize from 'sequelize'

const info = {
    databaseName: 'xfolio',
    username: 'root',
    password: 'root'
}

export default new Sequelize(info.databaseName, info.username, info.password, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    underscored: true,
    timezone: '+08:00',
    dialectOptions: {
        ssl: false,
    }
})
