const Database = require('../services/database')
const config = require('../config')
const { User } = require('../models')

before(async () => {
  // Clear responsebase
  await Database.dropAllSchemas()
  await Database.sync({ force: true })
  // Create the admin user
  await User.create({
    role_id: 0, username: config.ADMIN_ID, mobilephone: 123456789, password: config.ADMIN_PASSWORD,
  })
})

// Must be run before user
require('./countries.test')
require('./majors.test')
require('./schools.test')
require('./places.test')

require('./users.test')

// Must be run after user
require('./users_majors.test')
require('./users_countries.test')
require('./users_schools.test')
require('./users_places.test')
require('./courses.test')
require('./courses_majors.test')
require('./schedules.test')
require('./classes.test')
require('./classes_courses.test')
require('./followers_followings.test')
require('./tags.test')
require('./avatars.test')
// require('./portfolios.test')
require('./orders.test')
