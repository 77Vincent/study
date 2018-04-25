import Db from '../utils/database.js'
import rq from 'request-promise-native'
import c from '../config'

const url = `${c.protocol}://${c.host}:${c.port}/api`
const run = async () => {
  try {
    await rq({ method: 'DELETE', url: `${url}/users/1`})
    await rq({ method: 'DELETE', url: `${url}/tags/1`})
    await rq({ method: 'DELETE', url: `${url}/courses/1`})
    await rq({ method: 'DELETE', url: `${url}/classes/1`})
    await rq({ method: 'DELETE', url: `${url}/comments/1`})
    await rq({ method: 'DELETE', url: `${url}/posts/1`})
    await rq({ method: 'DELETE', url: `${url}/schedules/1`})
    await rq({ method: 'DELETE', url: `${url}/pictures/1`})
    await rq({ method: 'DELETE', url: `${url}/sessions`})

  } catch (err) {
    console.error('init Error', err)
  }
}
run()


    
