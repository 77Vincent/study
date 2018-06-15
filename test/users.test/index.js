const assert = require('assert')

const { login, request, modified, url, password } = require('../service')
const data = require('./data')
const user1 = data[0].mobilephone
const user2 = data[1].mobilephone
const toUpdate = {
  cost: 666,
  gender: true,
  name: modified,
  bio: modified,
}

describe('User', () => {
  it('Create = 200', async () => {
    for (let i = 0; i < data.length; i++) {
      await request({ method: 'PUT', url: `${url}/users`, body: data[i] })
    }
    const users = await request({ url: `${url}/users`})
    // Admin user is always created
    assert.equal(users.body.length - 1, data.length)
  })

  it('Create a existing one = 409', async () => {
    try {
      await request({ method: 'PUT', url: `${url}/users`, body: data[0] })
    } catch (err) {
      assert.equal(err.statusCode, 409)
    }
  })

  it('Update by visitor = 401', async () => {
    try {
      await request({ url: `${url}/users/${user1}`, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by other user = 403', async () => {
    const session = await login(user1, password)
    const res = await request({ url: `${url}/users/${user2}` })
    const auth = { bearer: session.token }
    try {
      await request({ method: 'POST', url: `${url}/users/${res.body.id}`, auth, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update with not satisfiable input = 416', async () => {
    const session = await login(user2, password)
    try {
      await request({
        method: 'POST',
        url: `${url}/users/${session.data.id}`,
        auth: { bearer: session.token },
        body: { cost: 99999 },
      })
    } catch (err) {
      assert.equal(err.statusCode, 416)
    }
  })

  it('Update by owner = 200', async () => {
    try {
      const session = await login(user1, password)
      const auth = { bearer: session.token }
      await request({ method: 'POST', url: `${url}/users/${session.data.id}`, auth, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})