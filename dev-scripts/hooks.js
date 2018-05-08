const rq = require('request-promise-native')
const c = require('../config')

const url = `${c.protocol}://${c.host}:${c.port}/api`

const run = async () => {
  try {
    await rq({ method: 'POST', url: `${url}/hooks`})

  } catch (err) {
    console.error('init Error', err)
  }
}
run()
