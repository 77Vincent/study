const login = require('./login')
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const rq = require('request-promise-native')
const c = require('../config')

const file1 = path.resolve('static/images/logo.png')
const file1Base64 = fs.readFileSync(file1, { encoding: 'base64' })

const url = `${c.protocol}://${c.host}:${c.port}/api`
const modified = 'THIS FIELD HAS BEEN MODIFIED FOR TESTING PURPOSE'
const file =  {
  path: path.resolve('static/images'),
  name: 'test.jpg'
}
let session = {};

// users 
(async () => {
  session = await login('18811111111', '000000')
  await rq({
    method: 'POST',
    url: `${url}/users/3`,
    auth: { bearer: session.token },
    body: { username: modified, cost: 9999, gender: true, name: modified , bio: modified },
    json: true })

  await rq({
    method: 'POST',
    url: `${url}/tags/2`,
    body: { content: modified, },
    json: true })

  await rq({
    method: 'POST',
    url: `${url}/courses/2`,
    body: { label: modified, description: modified },
    json: true })

  await rq({
    method: 'POST',
    url: `${url}/classes/2`,
    body: { start: new Date('2018/11/11'), end: new Date('2018/12/12'), length: 33, finished: true },
    json: true })

  await rq({
    method: 'POST',
    url: `${url}/schedules/2`,
    body: { label: modified, quota: 99, finished: false },
    json: true })

  await rq({
    method: 'POST',
    url: `${url}/avatars`,
    auth: { bearer: session.token },
    body: {
      mime: mime.getType(file.name.split('.')[1]),
      content: fs.readFileSync(`${file.path}/${file.name}`, 'base64'),
      user_id: 2
    },
    json: true })
})()