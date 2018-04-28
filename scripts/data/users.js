const fs = require('fs')
const path = require('path')
const mime = require('mime')

const file1 = path.resolve('static/images/logo.png')

module.exports.dummyUsers = [{
  password: '000000',
  name: '老师1',
  role_id: 2,
  school: '北京大学',
  title: '建筑师',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
  gender: 1,
  cost: 300,
  avatar_base64: fs.readFileSync(file1, { encoding: 'base64' }),
  avatar_mime: mime.getType(file1),
  country: 'US',
  place: 'online',
  mobilephone: 18811111111,
  email: 'teacher1@xfolio.cn'
}]
// }, {
//   password: '000000',
//   name: '老师2',
//   role_id: 2,
//   school: '哈佛大学',
//   title: '插画师',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
//   gender: 0,
//   cost: 200,
//   province: '31',
//   country: 'HK',
//   available: 30,
//   city: '3101',
//   place: 'offline',
//   mobilephone: 18822222222,
//   email: 'teacher2@xfolio.cn'
// }, {
//   password: '000000',
//   name: '老师3',
//   role_id: 2,
//   school: '耶鲁大学',
//   title: '服装设计师',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
//   gender: 1,
//   place: 'online',
//   cost: 400,
//   active: false,
//   province: '11',
//   available: 15,
//   country: 'AU',
//   city: '1101',
//   mobilephone: 18833333333,
//   email: 'teacher3@xfolio.cn'
// }, {
//   password: '000000',
//   name: '老师4',
//   role_id: 2,
//   school: 'MIT',
//   title: '工业设计师',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
//   gender: 0,
//   cost: 999,
//   province: '45',
//   available: 20,
//   country: 'GB',
//   city: '4501',
//   mobilephone: 18844444444,
//   email: 'teacher4@xfolio.cn'
// }, {
//   password: '000000',
//   name: '学生1',
//   school: '清华大学',
//   title: '景观设计师',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
//   gender: 1,
//   mobilephone: 17711111111,
//   province: '45',
//   city: '4503',
//   email: 'student1@xfolio.cn'
// }, {
//   password: '000000',
//   name: '学生2',
//   school: '华侨大学',
//   title: '游戏设计',
//   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut .',
//   gender: 0,
//   mobilephone: 17722222222,
//   province: '22',
//   city: '2201',
//   email: 'student2@xfolio.cn'
// }]