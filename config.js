// All server configurations are stored here

const path = require('path')
const env = process.env.NODE_ENV

const development = {
  host: 'localhost',
}
const production = {
  host: 'www.xfolio.cn',
}

const base = {
  // http
  protocol: 'http',
  port: 3001,

  // Database basic config
  database: 'mysql',
  databaseName: 'xfolio',
  databaseUser: 'root',
  databaseTimezone: '+8:00',
  databasePassword: '$Xf0li0Xf0li0',
  databasePort: 3306,
  queryLimit: 50,

  // Token
  cookiesTimeout: 60 * 60 * 1000,
  tokenSecret: 'Jessie',
  adminID: 'admin',
  adminPassword: '$Xf0li0Xf0li0',

  // Messages
  messages: {
    invalidRequest: 'Bad request due to the lack of necessary content in the request body.\n',
    unauthorized: 'Protected resource, use Authorization header to get access\n'
  },

  // Store
  fileLocation: path.resolve('../xfolio-files') 
}

if (env === 'production') {
  Object.assign(base, production)
} else if (env === 'development') {
  Object.assign(base, development)
}

module.exports = base