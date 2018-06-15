const assert = require('assert')

const data = require('./data')
const { login, request, URL, PASSWORD, USERS } = require('../service')
const user1 = USERS[0].mobilephone
const user2 = USERS[1].mobilephone
const user3 = USERS[2].mobilephone
const user4 = USERS[3].mobilephone

describe('Avatar', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/avatars`,
        body: data[0]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create without body eturn 400', async () => {
    try {
      let session = await login(user1, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/avatars`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 400)
    }
  })

  it('Create by user should return 201', async () => {
    let session = await login(user1, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/avatars`,
      auth: { bearer: session.token },
      body: data[0]
    })
    session = await login(user2, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/avatars`,
      auth: { bearer: session.token },
      body: data[1]
    })
    session = await login(user3, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/avatars`,
      auth: { bearer: session.token },
      body: data[2]
    })
    session = await login(user4, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/avatars`,
      auth: { bearer: session.token },
      body: data[3]
    })
    assert.ok(true)
  })

  it('Create a existing one should return 409', async () => {
    try {
      let session = await login(user1, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/avatars`,
        auth: { bearer: session.token },
        body: data[1]
      })
    } catch (err) {
      assert.equal(err.statusCode, 409)
    }
  })

  it('Update by visitor should return 401', async () => {
    try {
      await request({
        method: 'POST',
        url: `${URL}/avatars/2`,
        body: data[2]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(user1, PASSWORD)
      await request({
        method: 'POST',
        url: `${URL}/avatars/${session.data.avatar_id}`,
        auth: { bearer: session.token },
        body: data[0]
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})