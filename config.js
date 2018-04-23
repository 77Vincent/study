// All server configs are stored here

export default {
  queryLimit: 50,
  protocol: 'http',
  host: 'localhost',
  domain: 'xfolio.cn',
  port: 3001,
  // Database
  database: 'mysql',
  databaseName: 'xfolio',
  databaseUser: 'root',
  databaseTimezone: '+8:00',
  databasePassword: '$Xf0li0Xf0li0',
  databasePort: 3306,
  // Oauth and token
  cookiesTimeout: 60 * 60 * 1000,
  tokenSecret: 'Jessie'
}
