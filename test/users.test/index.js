const assert = require('assert')

const { login, request, MODIFIED, URL, PASSWORD } = require('../service')
const USERS = require('./data')
const toUpdate = {
  cost: 666,
  gender: true,
  name: MODIFIED,
  bio: MODIFIED,
}

describe('User', () => {
  it('Create = 200', async () => {
    for (let i = 0; i < USERS.length; i++) {
      await request({ method: 'PUT', url: `${URL}/users`, body: USERS[i] })
    }
    const res = await request({ url: `${URL}/users`})
    // Admin user is always created
    assert.equal(res.body.length - 1, USERS.length)
  })

  it('Create a existing one = 409', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/users`, body: USERS[0] })
    } catch (err) {
      assert.equal(err.statusCode, 409)
    }
  })

  it('Update by visitor = 401', async () => {
    try {
      await request({ url: `${URL}/users/${USERS[0].mobilephone}`, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by other user = 403', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      const auth = { bearer: session.token }
      await request({ method: 'POST', url: `${URL}/users/4`, auth, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update with not satisfiable input = 416', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      const auth = { bearer: session.token }
      await request({ method: 'POST', url: `${URL}/users/${session.data.id}`, auth, body: { cost: 99999 }})
    } catch (err) {
      assert.equal(err.statusCode, 416)
    }
  })

  it('Update by owner = 200', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      const auth = { bearer: session.token }
      await request({ method: 'POST', url: `${URL}/users/${session.data.id}`, auth, body: toUpdate })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})