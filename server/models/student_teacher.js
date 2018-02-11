import sequelize from './sequelize.js';
import Sequelize from 'sequelize';
const Student_Teacher = sequelize.define('student_teacher', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    student_id: {
        type: Sequelize.INTEGER
    },
    teacher_id: {
        type: Sequelize.INTEGER
    }
},{
    tableName: 'Student_Teacher'
});

export default Student_Teacher;