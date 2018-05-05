// All server configurations are stored here

const path = require('path')

module.exports = {
  // http
  protocol: 'http',
  host: 'localhost',
  domain: 'xfolio.cn',
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

  // Store
  fileLocation: path.resolve('../xfolio-files') 
}
