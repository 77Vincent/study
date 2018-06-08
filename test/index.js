const Database = require('../database')
const config = require('../config')
const { User } = require('../models')

before(async () => {
  // Clear responsebase
  await Database.dropAllSchemas()
  await Database.sync({ force: true })
  // Create the admin user
  await User.create({ role_id: 0, username: config.adminID, mobilephone: 123456789, password: config.adminPassword })
})

require('./majors.test')
require('./users.test')
require('./users_majors.test')
require('./courses.test')
require('./courses_majors.test')
require('./schedules.test')
require('./classes.test')
require('./classes_courses.test')
require('./followers_followings.test')
require('./tags.test')
require('./avatars.test')
require('./orders.test')