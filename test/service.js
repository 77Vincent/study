const rq = require('request-promise-native')
const config = require('../config')
const USERS = require('./users.test/data')


const MODIFIED = 'MODIFIED DATA'
const password = '000000'
const url = `${config.protocol}://${config.host}:${config.port}/api`

const request = async (config) => {
  const response = await rq(Object.assign({
    json: true,
    resolveWithFullResponse: true
  }, config))
  return response
}

const login = async (id = '', password = '') => {
  const data = await rq({
    method: 'POST',
    url: `${url}/sessions`,
    body: {
      id: String(id),
      password: String(password)
    },
    json: true
  })
  return data
}

module.exports = { 
  login,
  request,
  MODIFIED,
  url,
  password,
  USERS
}