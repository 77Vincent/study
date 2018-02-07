import sequelize from './sequelize.js';
import Sequelize from 'sequelize';

const Student_Major = sequelize.define('student_major', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    major_id: {
        type: Sequelize.STRING
    },
    student_id: {
        type: Sequelize.DATE,
    }
});

Student_Major.sync(); //创建表
export default Student_Major;