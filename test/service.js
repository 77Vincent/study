const rq = require('request-promise-native')
const config = require('../config')

const USERS = require('./users.test/data')
const MODIFIED = 'MODIFIED DATA'
const PASSWORD = '000000'
const URL = `${config.protocol}://${config.host}:${config.port}/api`

const request = async (config) => {
  const response = await rq(Object.assign({
    json: true,
    resolveWithFullResponse: true
  }, config))
  return response
}

const login = async (id = '', PASSWORD = '') => {
  const data = await rq({
    method: 'POST',
    url: `${URL}/sessions`,
    body: {
      id: String(id),
      password: String(PASSWORD)
    },
    json: true
  })
  return data
}

module.exports = { 
  login,
  request,
  MODIFIED,
  URL,
  PASSWORD,
  USERS
}