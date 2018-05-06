const rq = require('request-promise-native')
const c = require('../config')
const login = require('./login')

const url = `${c.protocol}://${c.host}:${c.port}/api`;

(async () => {
  try {
    const session = await login()
    console.log(session)
    // let data = await rq({
    //   url: `${url}/users`,
    //   auth: {
    //     bearer: token
    //   }
    // })
  } catch (err) {
    throw err
  }
})()