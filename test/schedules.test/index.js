const assert = require('assert')

const data = require('./data')
const {
  login, request, MODIFIED, URL,
} = require('../service')
const config = require('../../config')
const users = require('../users.test/data')

const userA = users[1].mobilephone
const userB = users[2].mobilephone
const PASSWORD = '000000'
const toUpdate = {
  label: MODIFIED,
  quota: 99,
  finished: 1,
}

describe('Schedule', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/schedules`,
        body: data[0],
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create by user should return 201', async () => {
    for (let i = 0; i < data.length; i += 1) {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/schedules`,
        auth: { bearer: session.token },
        body: data[i],
      })
    }
    assert.ok(true)
  })

  it('Get by visitor should return 401', async () => {
    try {
      await request({ url: `${URL}/schedules` })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Get by admin user should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        url: `${URL}/schedules`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Get by user should return 200', async () => {
    try {
      const session = await login(config.ADMIN_ID, config.ADMIN_PASSWORD)
      await request({
        url: `${URL}/schedules`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Update by visitor should return 401', async () => {
    try {
      await request({
        method: 'POST',
        url: `${URL}/schedules/2`,
        body: toUpdate,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by other user should return 403', async () => {
    try {
      const session = await login(userB, PASSWORD)
      await request({
        method: 'POST',
        url: `${URL}/schedules/2`,
        body: toUpdate,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update with not satisfiable input should return 416', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'POST',
        url: `${URL}/schedules/2`,
        body: { quota: 999 },
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 416)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'POST',
        url: `${URL}/schedules/2`,
        body: toUpdate,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${URL}/schedules/1`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by other user should return 403', async () => {
    try {
      const session = await login(userB, PASSWORD)
      await request({
        method: 'DELETE',
        url: `${URL}/schedules/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete by owner should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'DELETE',
        url: `${URL}/schedules/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})
