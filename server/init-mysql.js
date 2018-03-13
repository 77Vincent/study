'use strict'

import sequelize from './utili'
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
      label: 'architecture',
      description: '建筑设计'
    })
    await Major.create({
      name: '景观',
      label: 'landscape',
      description: '景观设计'
    })
    await Major.create({
      name: '室内',
      label: 'interior',
      description: '室内，装潢设计'
    })
    await Major.create({
      name: '平面',
      label: 'graphic',
      description: '平面，视觉设计'
    })
    await Major.create({
      name: '工业',
      label: 'industry',
      description: '工业产品设计'
    })
    await Major.create({
      name: '服装',
      label: 'costume',
      description: '服装设计'
    })
    await Major.create({
      name: 'UI/UX',
      label: 'UI',
      description: '界面及交互设计'
    })

    await User.sync({ force: true })
    await User.create({
      username: 'user1',
      password: '000000',
      name: '测试用户1',
      role: 'teacher',
      school: '北京大学',
      title: '建筑师',
      bio: '建筑师，或称画则师、图则师、则师，是负责设计建筑物平面图的专业人士。建筑师通过与工程投资方和施工方的合作，在技术、经济、功能和造型上实现建筑物的营造。',
      gender: true,
      mobilephone: 18811111111,
      email: 'user1@xfolio.cn'
    })

  } catch (err) {
    console.log('init Error', err)
  }
})()