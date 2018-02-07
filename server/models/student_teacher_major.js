import sequelize from './sequelize.js';
import Sequelize from 'sequelize';

const Student_Teacher_Major = sequelize.define('student_teacher_major', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    teacher_major_id: {
        type: Sequelize.STRING
    },
    student_id: {
        type: Sequelize.DATE,
    }
});

Student_Teacher_Major.sync(); //创建表
export default Student_Teacher_Major;