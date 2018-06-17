const assert = require('assert')

const data = require('./data')
const { login, request, URL } = require('../service')
const config = require('../../config')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const PASSWORD = '000000'
const toUpdate = {
  length: 99,
  date: new Date('1990/06/29'),
  finished: true,
}

describe('Class', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/classes`,
        body: data[0],
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 201', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(userA, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/classes`,
        auth: { bearer: session.token },
        body: data[i],
      })
    }
    assert.ok(true)
  })

  it('Get by visitor should return 401', async () => {
    try {
      await request({ url: `${URL}/classes` })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Get by admin user should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        url: `${URL}/classes`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Get by user should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        url: `${URL}/classes`,
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
        url: `${URL}/classes/2`,
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
        url: `${URL}/classes/2`,
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
        url: `${URL}/classes/2`,
        body: { length: 999 },
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
        url: `${URL}/classes/2`,
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
        url: `${URL}/classes/1`,
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
        url: `${URL}/classes/1`,
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
        url: `${URL}/classes/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})