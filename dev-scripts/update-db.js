const login = require('./login')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const rq = require('request-promise-native')
const c = require('../config')

const file1 = path.resolve('static/images/logo.png')
const file1Base64 = fs.readFileSync(file1, { encoding: 'base64' })

const url = `${c.protocol}://${c.host}:${c.port}/api`
const getRandom = () => {
  return String(Math.round(Math.random() * 100000))
}

// users 
(async () => {
  try {
    const session = await login(c.adminID, c.adminPassword)
    await rq({
      method: 'POST',
      url: `${url}/users/3`,
      auth: {
        bearer: session.token
      },
      body: {
        username: 'aaaaaaaaa',
        cost: 9999,
        gender: true,
        jjj: 999,
        name: 'hhhhhhhhhhh' ,
        bio: '111111111112',
        dummy: 111
      },
      json: true })
  } catch (err) {
    console.error(err)
  }
})();
// tags
(async () => {
  try {
    await rq({
      method: 'POST',
      url: `${url}/tags/2`,
      body: { 
        content: getRandom(),
        dummy: 111
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
        finished: true,
        dummy: 111
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
        finished: false,
        dummy: 111
      },
      json: true })
  } catch (err) {
    console.error(err)
  }
})();

// avatar
const file =  {
  path: path.resolve('static/images'),
  name: 'test.jpg'
};
(async () => {
  try {
    const session = await login(c.adminID, c.adminPassword)
    await rq({
      method: 'POST',
      url: `${url}/avatars`,
      auth: {
        bearer: session.token
      },
      body: {
        mime: mime.getType(file.name.split('.')[1]),
        content: fs.readFileSync(`${file.path}/${file.name}`, 'base64'),
        user_id: 2
      },
      json: true })
  } catch (err) {
    console.error(err)
  }
})();
