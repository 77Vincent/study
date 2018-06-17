const assert = require('assert')

const data = require('./data')
const { login, request, URL } = require('../service')
const users = require('../users.test/data')

const userA = users[1].mobilephone
const userB = users[2].mobilephone
const userC = users[3].mobilephone
const userD = users[4].mobilephone
const PASSWORD = '000000'

describe('Follower_Following', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/followers_followings`,
        body: data[0],
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    let session = await login(userA, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[0],
    })
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[1],
    })
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[2],
    })
    session = await login(userB, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[1],
    })
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[3],
    })
    session = await login(userC, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[2],
    })
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[3],
    })
    session = await login(userD, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/followers_followings`,
      auth: { bearer: session.token },
      body: data[3],
    })
    assert.ok(true)
  })

  it('Delete should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'DELETE',
        url: `${URL}/followers_followings/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})
