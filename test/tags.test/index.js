var assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const password = '000000'

describe('Tag', function() {
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

  it('Update by visitor should return 401', async function() {
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

  it('Update by other user should return 403', async function() {
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

  it('Update by owner should return 200', async function() {
    const session = await login(userA, password)
    const response = await request({
      method: 'POST',
      url: `${url}/tags/2`,
      auth: { bearer: session.token },
      body: { content: modified, },
     })

    assert.equal(response.statusCode, 200)
  })

  it('Delete by visitor should return 401', async function() {
    try {
      const response = await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by other user should return 403', async function() {
    try {
      const session = await login(userB, password)
      const response = await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete by owner should return 200', async function() {
    try {
      const session = await login(userA, password)
      const response = await request({
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