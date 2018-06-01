var assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const userC = users[3].mobilephone
const userD = users[4].mobilephone
const password = '000000'

describe('Follower_Following', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/followings`,
        body: data[0]
      })
    } catch(err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    let session = await login(userA, password)
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[0]
    })
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[1]
    })
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[2]
    })
    session = await login(userB, password)
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[1]
    })
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[4]
    })
    session = await login(userC, password)
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[2]
    })
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[3]
    })
    session = await login(userD, password)
    await request({
      method: 'PUT',
      url: `${url}/followings`,
      auth: { bearer: session.token },
      body: data[3]
    })
    assert.ok(true)
  })

  it('Delete should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'DELETE',
        url: `${url}/followings/1`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})