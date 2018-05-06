const rq = require('request-promise-native')
const c = require('../config')

const url = `${c.protocol}://${c.host}:${c.port}/api`

const login = async (id = '', password = '') => {
  const data = await rq({
    method: 'POST',
    url: `${url}/sessions`,
    body: { id, password },
    json: true
  })
  console.log(data)
  return data
}

module.exports = { login }