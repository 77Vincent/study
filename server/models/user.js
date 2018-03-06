import Sequelize from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('user', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    birthday: {
        type: Sequelize.DATE,
    },
    mobilephone: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    last_logout: {
        type: Sequelize.DATE,
    },
},{
    tableName: 'User'
});

export default User;