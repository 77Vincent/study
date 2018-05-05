const rq = require('request-promise-native')
const c = require('../config')

const url = `${c.protocol}://${c.host}:${c.port}/api`

module.exports = async () => {
  const data = await rq({
    method: 'POST',
    url: `${url}/sessions`,
    body: { 
      id: c.adminID,
      password: c.adminPassword 
    },
    json: true
  })
  return data.token
}