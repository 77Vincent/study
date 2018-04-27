import Db from '../utils/database.js'
import rq from 'request-promise-native'
import c from '../config'

const url = `${c.protocol}://${c.host}:${c.port}/api`
const getRandom = () => {
  return String(Math.round(Math.random() * 100000))
}
const run = async () => {
  try {
    await rq({
      method: 'POST',
      url: `${url}/tags/2`,
      body: { 
        content: getRandom()
      },
      json: true })
    await rq({
      method: 'POST',
      url: `${url}/courses/2`,
      body: {
        label: getRandom(),
        description: getRandom()
      },
      json: true })
    await rq({
      method: 'POST',
      url: `${url}/classes/2`,
      body: {
        start: new Date('2018/11/11'),
        end: new Date('2018/12/12'),
        length: getRandom(),
        finished: true
      },
      json: true })
    await rq({
      method: 'POST',
      url: `${url}/schedules/2`,
      body: {
        label: getRandom(),
        quota: 99,
        finished: false
      },
      json: true })
    await rq({
      method: 'POST',
      url: `${url}/orders/74aea3d0-49e9-11e8-952a-f5aee99155db`,
      body: {
        total_price: 9999
      },
      json: true })

  } catch (err) {
    console.error('init Error', err)
  }
}
run()


    
