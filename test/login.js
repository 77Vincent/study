const rq = require('request-promise-native')
const c = require('../config')

const url = `${c.protocol}://${c.host}:${c.port}/api`

module.exports = async (id = '', password = '') => {
  const data = await rq({
    method: 'POST',
    url: `${url}/sessions`,
    body: {
      id: String(id),
      password: String(password)
    },
    json: true
  })
  console.log(data)
  return data
}
