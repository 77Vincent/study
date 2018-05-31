const Database = require('../database')
const config = require('../config')
const { Role, User } = require('../models')

before(async () => {
  // Clear responsebase
  await Database.dropAllSchemas()
  await Database.sync({ force: true })
  // Create roles and admin user
  await Role.bulkCreate([{ label: 'admin' }, { label: 'teacher' }, { label: 'student' }])
  await User.create({ role_id: 1, username: config.adminID, mobilephone: 123456789, password: config.adminPassword })
})

require('./majors.test')
require('./users.test')
require('./tags.test')
require('./courses.test')
require('./schedules.test')
// require('./classes.test')