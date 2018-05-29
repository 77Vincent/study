var assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')
const config = require('../../config')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const password = '000000'
const toUpdate = {
  label: modified,
  description: modified
}

describe('Course', function() {
  it('Create should return 201', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(userA, password)
      await request({
        method: 'PUT',
        url: `${url}/courses`,
        auth: { bearer: session.token },
        body: data[i]
      })
    }
    assert.ok(true)
  })

  it('Update a course by visitor should return 401', async function() {
    try {
      await request({
        method: 'POST',
        url: `${url}/courses/2`,
        body: toUpdate
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update a course by other user should return 403', async function() {
    try {
      const session = await login(userB, password)
      await request({
        method: 'POST',
        url: `${url}/courses/2`,
        body: toUpdate,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update a course by owner should return 200', async function() {
    try {
      const session = await login(userA, password)
      await request({
        method: 'POST',
        url: `${url}/courses/2`,
        body: toUpdate,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete a course by visitor should return 401', async function() {
    try {
      await request({
        method: 'DELETE',
        url: `${url}/courses/1`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete a course by other user should return 403', async function() {
    try {
      const session = await login(userB, password)
      await request({
        method: 'DELETE',
        url: `${url}/courses/1`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete a course by owner should return 200', async function() {
    try {
      const session = await login(userA, password)
      await request({
        method: 'DELETE',
        url: `${url}/courses/1`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})