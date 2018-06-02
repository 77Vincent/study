const assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const password = '000000'

describe('Tag', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/tags`,
        body: data[0]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(userA, password)
      await request({
        method: 'PUT',
        url: `${url}/tags`,
        auth: { bearer: session.token },
        body: data[i]
      })
    }
    assert.ok(true)
  })

  it('Update by visitor should return 401', async () => {
    try {
      await request({
        method: 'POST',
        url: `${url}/tags/2`,
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by other user should return 403', async () => {
    const session = await login(userB, password)
    try {
      await request({
        method: 'POST',
        url: `${url}/tags/2`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'POST',
        url: `${url}/tags/2`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by other user should return 403', async () => {
    try {
      const session = await login(userB, password)
      await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete by owner should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})