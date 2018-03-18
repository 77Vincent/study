import db from '../utili/db.js'
import {
  User,
  Major,
  Role,
  User_Major
} from '../models'

(async () => {
  try {
    await db.dropAllSchemas()
    await db.sync({ force: true })

    await Role.bulkCreate([{
        label: 'admin'
      }, {
        label: 'teacher'
      }, {
        label: 'student'
      }])
    await Major.bulkCreate([{
      label: '建筑',
      description: '建筑设计'
    }, {
      label: '景观',
      description: '景观设计'
    }, {
      label: '室内',
      description: '室内，装潢设计'
    }, {
      label: '平面',
      description: '平面，视觉设计'
    }, {
      label: '工业',
      description: '工业产品设计'
    }, {
      label: '服装',
      description: '服装设计'
    }, {
      label: 'UI/UX',
      description: '界面及交互设计'
    }])
    await User.create({
      username: 'teacher1',
      password: '000000',
      name: '老师1',
      role_id: 'teacher',
      school: '北京大学',
      title: '建筑师',
      bio: '建筑师，或称画则师、图则师、则师，是负责设计建筑物平面图的专业人士。建筑师通过与工程投资方和施工方的合作，在技术、经济、功能和造型上实现建筑物的营造。',
      gender: true,
      mobilephone: 18811111111,
      email: 'user1@xfolio.cn'
    })
    await User.create({
      username: 'student1',
      password: '000000',
      name: '学生1',
      role_id: 'student',
      school: '清华大学',
      title: '景观设计师',
      bio: '建筑师，或称画则师、图则师、则师，是负责设计建筑物平面图的专业人士。建筑师通过与工程投资方和施工方的合作，在技术、经济、功能和造型上实现建筑物的营造。',
      gender: true,
      mobilephone: 18822222222,
      email: 'user2@xfolio.cn'
    })
    await User_Major.bulkCreate([{
        user_id: 1,
        major_id: 1
      }, {
        user_id: 1,
        major_id: 2 
      }, {
        user_id: 2,
        major_id: 3 
      }, {
        user_id: 2,
        major_id: 4 
      }])

  } catch (err) {
    console.log('init Error', err)
  }
})()