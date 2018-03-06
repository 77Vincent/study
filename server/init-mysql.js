'use strict'

import sequelize from './config/database'
import {
  User,
  Major,
  User_Major
} from './models'

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

    await User.sync({
      force: true
    })
    await User.create({
      username: 'user1',
      password: '000000',
      name: 'Vincent'
    })

  } catch (err) {
    console.log('init Error', err)
  }
})()