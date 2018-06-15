const assert = require('assert')

const { login, request, MODIFIED, url, password } = require('../service')
const users = require('./data')
const toUpdate = {
  cost: 666,
  gender: true,
  name: MODIFIED,
  bio: MODIFIED,
}

describe('User', () => {
  it('Create = 200', async () => {
    for (let i = 0; i < users.length; i++) {
      await request({ method: 'PUT', url: `${url}/users`, body: users[i] })
    }
    const res = await request({ url: `${url}/users`})
    // Admin user is always created
    assert.equal(res.body.length - 1, users.length)
  })

  it('Create a existing one = 409', async () => {
    try {
      await request({ method: 'PUT', url: `${url}/users`, body: users[0] })
    } catch (err) {
      assert.equal(err.statusCode, 409)
    }
  })

  it('Update by visitor = 401', async () => {
    try {
      await request({ url: `${url}/users/${users[0].mobilephone}`, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by other user = 403', async () => {
    const session = await login(users[0].mobilephone, password)
    const auth = { bearer: session.token }
    try {
      await request({ method: 'POST', url: `${url}/users/4`, auth, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update with not satisfiable input = 416', async () => {
    const session = await login(users[1].mobilephone, password)
    const auth = { bearer: session.token }
    try {
      await request({ method: 'POST', url: `${url}/users/${session.users.id}`, auth, body: { cost: 99999 }})
    } catch (err) {
      assert.equal(err.statusCode, 416)
    }
  })

  it('Update by owner = 200', async () => {
    try {
      const session = await login(users[0].mobilephone, password)
      const auth = { bearer: session.token }
      await request({ method: 'POST', url: `${url}/users/${session.users.id}`, auth, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})