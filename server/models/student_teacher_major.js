import sequelize from './sequelize.js';
import Sequelize from 'sequelize';
import Teacher_Major from './teacher_major';
import Student from './student';
const Student_Teacher_Major = sequelize.define('student_teacher_major', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
},{
    tableName: 'Student_Teacher_Major'
});

Student_Teacher_Major.belongsTo(Teacher_Major, {as:'teacher_major',foreignKey:'teacher_major_id'});
Teacher_Major.hasOne(Student_Teacher_Major,{as: 'student_teacher_major', foreignKey:'teacher_major_id'});

Student_Teacher_Major.belongsTo(Student, {as:'student',foreignKey:'student_id'});
Student.hasOne(Student_Teacher_Major,{as:'student_teacher_major', foreignKey:'student_id'});
Student_Teacher_Major.sync(); //创建表
export default Student_Teacher_Major;