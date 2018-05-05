const Database = require('..//database.js')
const rq = require('request-promise-native')
const c = require('../config')

const url = `${c.protocol}://${c.host}:${c.port}/api`
const run = async () => {
  try {
    await rq({ method: 'DELETE', url: `${url}/users/2`})
    await rq({ method: 'DELETE', url: `${url}/tags/1`})
    await rq({ method: 'DELETE', url: `${url}/courses/1`})
    await rq({ method: 'DELETE', url: `${url}/classes/1`})
    await rq({ method: 'DELETE', url: `${url}/comments/1`})
    await rq({ method: 'DELETE', url: `${url}/posts/1`})
    await rq({ method: 'DELETE', url: `${url}/schedules/1`})
    await rq({ method: 'DELETE', url: `${url}/pictures/1`})
    await rq({ method: 'DELETE', url: `${url}/sessions`})
    await rq({ method: 'DELETE', url: `${url}/avatars`, body: { user_id: 2 }, json: true})

  } catch (err) {
    console.error('init Error', err)
  }
}
run()


    
