const rq = require('request-promise-native')
const c = require('../config')

const url = `${c.protocol}://${c.host}:${c.port}/api`

const run = async () => {
  try {
    const data = await rq({ method: 'POST', url: `${url}/hooks`})
    console.log(data)

  } catch (err) {
    console.error('init Error', err)
  }
}
run()
