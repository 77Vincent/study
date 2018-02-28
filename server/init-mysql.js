'use strict'

const sequelize = require('./models/sequelize')
const Student = require('./models').Student
const Student_Major = require('./models').Student_Major
const Teacher = require('./models').Teacher
const Teacher_Major = require('./models').Teacher_Major
const Student_Teacher = require('./models').Student_Teacher
const Major = require('./models').Major

const initMysql = (async () => {
  try {
    await sequelize.dropAllSchemas()

    await Major.sync({
      force: true
    })
    await Major.create({
      name: '建筑',
      desc: '建筑设计'
    })
    await Major.create({
      name: '景观',
      desc: '景观设计'
    })
    await Major.create({
      name: '室内',
      desc: '室内设计'
    })
    await Major.create({
      name: '平面',
      desc: '平面设计'
    })
    await Major.create({
      name: '工业',
      desc: '工业设计'
    })
    await Major.create({
      name: '服装',
      desc: '服装设计'
    })

    // Teacher
    await Teacher.sync({
      force: true
    })
    await Teacher.create({
      account: 'teacher1',
      name: 'Vincent',
      password: '000000'
    })
    await Teacher.create({
      account: 'teacher2',
      name: 'Jessie',
      password: '000000'
    })

    // Student 
    await Student.sync({
      force: true
    })
    await Student.create({
      account: 'teststudent1',
      name: 'Peter',
      password: '000000'
    })
    await Student.create({
      account: 'teststudent2',
      name: 'Marry',
      password: '000000'
    })

    // Teacher Major
    await Teacher_Major.sync({
      force: true
    })
    await Teacher_Major.create({
      major_id: 1,
      teacher_id: 1 
    })
    await Teacher_Major.create({
      major_id: 2,
      teacher_id: 2 
    })

    // Student Major
    await Student_Major.sync({
      force: true
    })
    await Student_Major.create({
      major_id: 1,
      student_id: 1 
    })
    await Student_Major.create({
      major_id: 2,
      student_id: 2 
    })

    // Student Teacher
    await Student_Teacher.sync({
      force: true
    })
    await Student_Teacher.create({
      student_id: 1,
      teacher_id: 1
    })
    await Student_Teacher.create({
      student_id: 2,
      teacher_id: 2 
    })

    let data = await Student.findAll({
      where: {
        id: 4
      },
      include: [{
        model: Teacher
      }]
    })
    console.log('data:', data)
  } catch (err) {
    console.log('init Error', err)
  }
})()