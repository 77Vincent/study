import Sequelize from 'sequelize'
import databaseConfig from '../config/database.json'

const sequelize = new Sequelize(databaseConfig.databaseName, databaseConfig.userName, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    protocol: databaseConfig.dialect,
    port: databaseConfig.port,
    // 字段以下划线（_）来分割（默认是驼峰命名风格
    underscored: true,
    timezone: databaseConfig.timezone, //东八区
    dialectOptions: {
        ssl: databaseConfig.ssl,
    }
})

module.exports = sequelize