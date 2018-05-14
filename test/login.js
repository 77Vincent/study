const request = require('request-promise-native')
const config = require('../config')

const url = `${config.protocol}://${config.host}:${config.port}/api`

const login = async (id = '', password = '') => {
  const data = await request({
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

module.exports = login