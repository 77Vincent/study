// All server configurations are stored here

const path = require('path')

const env = process.env.NODE_ENV

const development = {
  HOST: 'localhost',
}
const production = {
  HOST: 'www.xfolio.cn',
}

const base = {
  // http
  PROTOCOL: 'http',
  PORT: 3001,

  // Database basic config
  DATABASE: 'mysql',
  DATABASE_NAME: 'xfolio',
  DATABASE_USER: 'root',
  TIMEZONE: '+8:00',
  DATABASE_PASSWORD: '$Xf0li0Xf0li0',
  DATABASE_PORT: 3306,
  LIMIT: 50,

  // Token
  TOKEN_TIMEOUT: 60 * 60 * 1000,
  TOKEN_SECRET: 'Jessie',
  ADMIN_ID: 'admin',
  ADMIN_PASSWORD: '$Xf0li0Xf0li0',

  // Messages
  messages: {
    INVALID_REQUEST: 'Bad request due to the lack of necessary content in the request body.\n',
    UNAUTHORIZED: 'Protected resource, use Authorization header to get access\n',
  },

  // Store
  FILE_LOCATION: path.resolve('../xfolio-files'),

  // 腾讯地图SDK key
  MAP_SERVICE_API_URL: 'http://apis.map.qq.com/ws/district/v1/',
  MAP_SERVICE_API_KEY: '74OBZ-IPQRV-YXJPL-UGYMF-EIMU3-XPFNP',
}

if (env === 'production') {
  Object.assign(base, production)
} else if (env === 'development') {
  Object.assign(base, development)
}

module.exports = base
