// All server configs are stored here

export default {
  queryLimit: 50,
  protocol: 'http',
  host: '39.104.108.82',
  domain: 'xfolio.cn',
  port: 3001,
  // Database
  db: 'mysql',
  dbName: 'xfolio',
  dbUser: 'root',
  dbTimezone: '+8:00',
  dbPassword: '$Xf0li0Xf0li0',
  dbPort: 3306,
  // Oauth and token
  cookiesTimeout: 60 * 60 * 1000,
  tokenSecret: 'Jessie'
}
