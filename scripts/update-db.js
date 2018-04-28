import Db from '../utils/database.js'
import rq from 'request-promise-native'
import c from '../config'

const url = `${c.protocol}://${c.host}:${c.port}/api`
const getRandom = () => {
  return String(Math.round(Math.random() * 100000))
}

// tags
(async () => {
  try {
    await rq({
      method: 'POST',
      url: `${url}/tags/2`,
      body: { 
        content: getRandom()
      },
      json: true })
  } catch (err) { console.error(err) }
})();

// courses
(async () => {
  try {
    await rq({
      method: 'POST',
      url: `${url}/courses/2`,
      body: {
        label: getRandom(),
        description: getRandom()
      },
      json: true })
  } catch (err) { console.error(err) }
})();

// classes
(async () => {
  try {
    await rq({
      method: 'POST',
      url: `${url}/classes/2`,
      body: {
        start: new Date('2018/11/11'),
        end: new Date('2018/12/12'),
        length: 33,
        finished: true
      },
      json: true })
  } catch (err) { console.error(err) }
})();

// schedules
(async () => {
  try {
    await rq({
      method: 'POST',
      url: `${url}/schedules/2`,
      body: {
        label: getRandom(),
        quota: 99,
        finished: false
      },
      json: true })
  } catch (err) {
    console.error(err)
  }
})();

// users 
(async () => {
  try {
    await rq({
      method: 'POST',
      url: `${url}/users/2`,
      body: {
        username: 'aaaaaaaaa',
        cost: 9999,
        gender: true,
        jjj: 999,
        name: 'hhhhhhhhhhh' ,
        bio: '111111111111'
      },
      json: true })
  } catch (err) {
    console.error(err)
  }
})();

// orders
// (async () => {
//   try {
//     await rq({
//       method: 'POST',
//       url: `${url}/orders/74aea3d0-49e9-11e8-952a-f5aee99155db`,
//       body: {
//         total_price: 9999
//       },
//       json: true })
//   } catch (err) { console.error(err) }
// })();
