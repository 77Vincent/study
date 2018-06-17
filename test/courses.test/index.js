const assert = require('assert')

const data = require('./data')
const {
  login, request, MODIFIED, URL,
} = require('../service')
const users = require('../users.test/data')

const userA = users[1].mobilephone
const userB = users[2].mobilephone
const PASSWORD = '000000'
const toUpdate = {
  label: MODIFIED,
  description: MODIFIED,
}

describe('Course', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/courses`,
        body: data[0],
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 201', async () => {
    for (let i = 0; i < data.length; i += 1) {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/courses`,
        auth: { bearer: session.token },
        body: data[i],
      })
    }
    assert.ok(true)
  })

  it('Update a course by visitor should return 401', async () => {
    try {
      await request({
        method: 'POST',
        url: `${URL}/courses/2`,
        body: toUpdate,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update a course by other user should return 403', async () => {
    try {
      const session = await login(userB, PASSWORD)
      await request({
        method: 'POST',
        url: `${URL}/courses/2`,
        body: toUpdate,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update a course by owner should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'POST',
        url: `${URL}/courses/2`,
        body: toUpdate,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete a course by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${URL}/courses/1`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete a course by other user should return 403', async () => {
    try {
      const session = await login(userB, PASSWORD)
      await request({
        method: 'DELETE',
        url: `${URL}/courses/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete a course by owner should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'DELETE',
        url: `${URL}/courses/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})
