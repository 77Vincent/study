import Sequelize from 'sequelize'
import { sequelize } from '../utili'

export default sequelize.define('user_major', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    major_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER
    }
},{
    tableName: 'User_Major'
})
