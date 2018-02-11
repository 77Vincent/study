import Student from './student';
import Student_Major from './student_major';
import Teacher_Major from './teacher_major';
import Teacher from './teacher';
import Major from './major';
import Student_Teacher from './student_teacher';

Student.belongsToMany(Major, {
    through: 'Student_Major',
    foreignKey: 'student_id'
});

Major.belongsToMany(Student, {
    through: 'Teacher_Major',
    foreignKey: 'major_id'
});

Teacher.belongsToMany(Major, {
    through: 'Teacher_Major',
    foreignKey: 'teacher_id'
});

Major.belongsToMany(Teacher, {
    through: 'Teacher_Major',
    foreignKey: 'major_id'
});

Student.belongsToMany(Teacher, {
    through: 'Student_Teacher',
    foreignKey: 'student_id'
});

Teacher.belongsToMany(Student, {
    through: 'Student_Teacher',
    foreignKey: 'Teacher_id'
});



export {
    Student,
    Student_Major,
    Teacher,
    Teacher_Major,
    Student_Teacher,
    Major
};