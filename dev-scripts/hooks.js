const rq = require('request-promise-native')
const c = require('../config')

const url = `${c.protocol}://${c.host}:${c.port}/api`

const run = async () => {
  try {
    const data = await rq({ method: 'POST', url: `http://39.104.108.82:3001/api/hooks`})
    console.log(data)

  } catch (err) {
    console.error('init Error', err)
  }
}
run()
