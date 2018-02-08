import sequelize from './sequelize.js';
import Sequelize from 'sequelize';

const User = sequelize.define('User', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
},{
    tableName: 'User'
});

User.sync({force:true}); //创建表

export default User;