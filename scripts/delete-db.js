import Db from '../utils/database.js'
import rq from 'request-promise-native'
import c from '../config'

const url = `${c.protocol}://${c.host}:${c.port}/api`
const run = async () => {
  try {
    await rq({ method: 'DELETE', url: `${url}/tags/1`})
    await rq({ method: 'DELETE', url: `${url}/courses/1`})
    await rq({ method: 'DELETE', url: `${url}/classes/1`})

  } catch (err) {
    console.error('init Error', err)
  }
}
run()


    
