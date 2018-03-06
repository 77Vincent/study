import Sequelize from 'sequelize';
import sequelize from '../base/database.js';

const User_Major = sequelize.define('user_major', {
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
});

export default User_Major;