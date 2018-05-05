const rq = require('request-promise-native')
const c = require('../config')
const getToken = require('./login')

const url = `${c.protocol}://${c.host}:${c.port}/api`;

(async () => {
  const token = await getToken()
  const data = await rq({
    method: 'GET',
    headers: {
      'Authorization': token 
    },
    url: `${url}/users`
  })
  console.log(data)
})()