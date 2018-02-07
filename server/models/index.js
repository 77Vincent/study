import Student from './student';
import Student_Major from './student_major';
import Teacher from './teacher';
import Teacher_Major from './teacher_major';
import Major from './major';
import student_teacher_major from './student_teacher_major';

Major.hasOne(Student_Major,{foreignKey:'major_id'});
Major.hasOne(Teacher_Major,{foreignKey:'major_id'});
Student.hasOne(Student_Major,{foreignKey:'student_id'});
Teacher.hasOne(Teacher_Major,{foreignKey:'teacher_id'});
Teacher_Major.hasOne(student_teacher_major,{foreignKey:'teacher_major_id'});
Student.hasOne(student_teacher_major,{foreignKey:'student_id'});


export {
    Student,
    Student_Major,
    Teacher,
    Teacher_Major,
    student_teacher_major,
    Major
};