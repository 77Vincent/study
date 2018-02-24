'use strict'

const sequelize = require('./models/sequelize')
const Student = require('./models').Student
const Student_Major = require('./models').Student_Major
const Teacher = require('./models').Teacher
const Teacher_Major = require('./models').Teacher_Major
const Student_Teacher = require('./models').Student_Teacher
const Major = require('./models').Major
 
const initMysql = (async() => {
    try{
        await sequelize.dropAllSchemas()
        
        await Major.sync({force:true});
        await Major.create({name:'建筑',desc:'建筑设计'})
        await Major.create({name:'景观',desc:'景观设计'})
        await Major.create({name:'室内',desc:'室内设计'})
        await Major.create({name:'平面',desc:'平面设计'})
        await Major.create({name:'工业',desc:'工业设计'})
        await Major.create({name:'服装',desc:'服装设计'})
    
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
        await Student_Teacher.sync({force:true});
    
        await Student_Teacher.create({student_id:1, teacher_id:1})
        await Student_Teacher.create({student_id:2, teacher_id:1})
        await Student_Teacher.create({student_id:3, teacher_id:1})
        await Student_Teacher.create({student_id:4, teacher_id:1})
        await Student_Teacher.create({student_id:2, teacher_id:6})
        await Student_Teacher.create({student_id:1, teacher_id:2})
        await Student_Teacher.create({student_id:3, teacher_id:2})
        await Student_Teacher.create({student_id:4, teacher_id:2})
        await Student_Teacher.create({student_id:1, teacher_id:3})
        await Student_Teacher.create({student_id:2, teacher_id:2})
        await Student_Teacher.create({student_id:3, teacher_id:4})
        await Student_Teacher.create({student_id:4, teacher_id:6})
    
        let data = await Student.findAll({
          where:{id:4},
          include:[
            {
              model:Teacher
            }
          ]
        });
        console.log('data:', data);
    }catch(err){
        console.log('init Error', err)
    }
})()
