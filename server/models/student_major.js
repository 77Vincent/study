import sequelize from './sequelize.js';
import Sequelize from 'sequelize';
import Student from './student';
import Major from './major';
const Student_Major = sequelize.define('student_major', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }
},{
    tableName: 'Student_Major'
});

Major.hasOne(Student_Major,{as:'student_major',foreignKey:'major_id'});
Student_Major.belongsTo(Major, {as:'major',foreignKey:'major_id'});

Student_Major.belongsTo(Student, {as:'student',foreignKey:'student_id'});
Student.hasOne(Student_Major,{as:'student_major',foreignKey:'student_id'});
export default Student_Major;



