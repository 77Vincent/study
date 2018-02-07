import sequelize from './sequelize.js';
import Sequelize from 'sequelize';

const Teacher_Major = sequelize.define('teacher_major', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    major_id: {
        type: Sequelize.STRING
    },
    teacher_id: {
        type: Sequelize.DATE,
    }
});

Teacher_Major.sync(); //创建表
export default Teacher_Major;