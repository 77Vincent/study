'use strict'

import sequelize from './base/database'
import {
  User,
  Major,
  User_Major
} from './models'

(async () => {
  try {
    await sequelize.dropAllSchemas()

    await Major.sync({ force: true })
    await Major.create({
      name: '建筑',
      description: '建筑设计'
    })
    await Major.create({
      name: '景观',
      description: '景观设计'
    })
    await Major.create({
      name: '室内',
      description: '室内设计'
    })
    await Major.create({
      name: '平面',
      description: '平面设计'
    })
    await Major.create({
      name: '工业',
      description: '工业设计'
    })
    await Major.create({
      name: '服装',
      description: '服装设计'
    })

    await User.sync({ force: true })
    await User.create({
      username: 'user1',
      password: '000000',
      name: 'Vincent',
      role: 'teacher',
      school: '北京大学',
      title: '建筑师',
      gender: true,
      mobilephone: 18877778888,
      email: 'user1@xfolio.cn'
    })
    await User.create({
      username: 'user2',
      password: '000000',
      name: 'Jessie',
      role: 'student',
      school: '台北大学',
      title: '插画师',
      gender: false,
      mobilephone: 16677776666,
      email: 'user2@xfolio.cn'
    })

  } catch (err) {
    console.log('init Error', err)
  }
})()