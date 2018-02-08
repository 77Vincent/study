import sequelize from './sequelize.js';
import Sequelize from 'sequelize';

const Student = sequelize.define('student', {
    id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    // account 代表 登陆的账号，name代表账号人的姓名
    account: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    birthday:{
        type: Sequelize.DATE,
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    last_logout: {
        type: Sequelize.DATE,
    }
},{
    tableName: 'Student'
});

Student.sync(); //创建表

export default Student;