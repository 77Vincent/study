'use strict'
const sequelize = require('./models/sequelize')
const Student = require('./models').Student
const Student_Major = require('./models').Student_Major
const Teacher = require('./models').Teacher
const Teacher_Major = require('./models').Teacher_Major
const Student_Teacher_Major = require('./models').Student_Teacher_Major
const Major = require('./models').Major
 
const initMysql = (async() => {
    try{
        await sequelize.dropAllSchemas()
        await Major.sync({force:true});
        await Major.create({name:'语文1',desc:'这是语文'})
        await Major.create({name:'语文2',desc:'这是语文'})
        await Major.create({name:'语文3',desc:'这是语文'})
        await Major.create({name:'语文4',desc:'这是语文'})
        await Major.create({name:'语文5',desc:'这是语文'})
        await Major.create({name:'语文6',desc:'这是语文'})
        await Major.create({name:'语文7',desc:'这是语文'})
        await Major.create({name:'语文8',desc:'这是语文'})
        await Major.create({name:'语文9',desc:'这是语文'})
        await Major.create({name:'语文10',desc:'这是语文'})
        await Major.create({name:'语文11',desc:'这是语文'})
        await Major.create({name:'语文12',desc:'这是语文'})
    
        await Teacher.sync({force:true});
        await Teacher.create({account:'vincent1', name:'vincent1',password:'123456'})
        await Teacher.create({account:'vincent2', name:'vincent2',password:'123456'})
        await Teacher.create({account:'vincent3', name:'vincent3',password:'123456'})
        await Teacher.create({account:'vincent4', name:'vincent4',password:'123456'})
        await Teacher.create({account:'vincent5', name:'vincent5',password:'123456'})
        await Teacher.create({account:'vincent6', name:'vincent6',password:'123456'})
        await Teacher.create({account:'vincent7', name:'vincent7',password:'123456'})
        await Teacher.create({account:'vincent8', name:'vincent8',password:'123456'})
    
    
        await Student.sync({force:true});
        await Student.create({account:'edguan1', name:'edguan1',password:'123456'})
        await Student.create({account:'edguan2', name:'edguan2',password:'123456'})
        await Student.create({account:'edguan3', name:'edguan3',password:'123456'})
        await Student.create({account:'edguan4', name:'edguan4',password:'123456'})
        await Student.create({account:'edguan5', name:'edguan5',password:'123456'})
        await Student.create({account:'edguan6', name:'edguan6',password:'123456'})
        await Student.create({account:'edguan7', name:'edguan7',password:'123456'})
        await Student.create({account:'edguan8', name:'edguan8',password:'123456'})
    
        await Teacher_Major.sync({force:true});
        await Teacher_Major.create({major_id:1,teacher_id:3})
        await Teacher_Major.create({major_id:1,teacher_id:4})
        await Teacher_Major.create({major_id:1,teacher_id:2})
        await Teacher_Major.create({major_id:1,teacher_id:1})
        await Teacher_Major.create({major_id:2,teacher_id:2})
        await Teacher_Major.create({major_id:2,teacher_id:2})
        await Teacher_Major.create({major_id:3,teacher_id:4})
        await Teacher_Major.create({major_id:3,teacher_id:2})
        await Teacher_Major.create({major_id:4,teacher_id:6})
        await Teacher_Major.create({major_id:3,teacher_id:8})
    
        await Student_Major.sync({force:true});
        await Student_Major.create({major_id:2,student_id:7})
        await Student_Major.create({major_id:1,student_id:7})
        await Student_Major.create({major_id:3,student_id:7})
        await Student_Teacher_Major.sync({force:true});
    
        await Student_Teacher_Major.create({student_id:1, teacher_major_id:1})
        await Student_Teacher_Major.create({student_id:2, teacher_major_id:1})
        await Student_Teacher_Major.create({student_id:3, teacher_major_id:1})
        await Student_Teacher_Major.create({student_id:3, teacher_major_id:2})
        await Student_Teacher_Major.create({student_id:4, teacher_major_id:4})
        await Student_Teacher_Major.create({student_id:4, teacher_major_id:6})
        await Student_Teacher_Major.create({student_id:2, teacher_major_id:5})
        await Student_Teacher_Major.create({student_id:3, teacher_major_id:3})
        await Student_Teacher_Major.create({student_id:4, teacher_major_id:3})
        await Student_Teacher_Major.create({student_id:6, teacher_major_id:2})
        await Student_Teacher_Major.create({student_id:1, teacher_major_id:4})
        await Student_Teacher_Major.create({student_id:3, teacher_major_id:6})
    
        let data = await Student_Teacher_Major.findAll({
          where:{student_id:4},
          include:[
            {
              model:Teacher_Major,
              as:'teacher_major',
              include:[
                {
                  model: Major,
                  as: 'major'
                }
              ]
            },
            {
              model:Student,
              as:'student'
            }
          ]
        });
        console.log('data:', data);
    }catch(err){
        console.log('init Error', err)
    }
})()
