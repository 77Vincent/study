const assert = require('assert')

const data = require('./data')
const { login, request, url } = require('../service')
const config = require('../../config')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const password = '000000'

describe('Avatar', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/avatars`,
        body: data[0]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create without body eturn 400', async () => {
    try {
      let session = await login(userA, password)
      await request({
        method: 'PUT',
        url: `${url}/avatars`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 400)
    }
  })

  it('Create by user should return 201', async () => {
    let session = await login(config.adminID, config.adminPassword)
    await request({
      method: 'PUT',
      url: `${url}/avatars`,
      auth: { bearer: session.token },
      body: data[0]
    })
    session = await login(userA, password)
    await request({
      method: 'PUT',
      url: `${url}/avatars`,
      auth: { bearer: session.token },
      body: data[1]
    })
    session = await login(userB, password)
    await request({
      method: 'PUT',
      url: `${url}/avatars`,
      auth: { bearer: session.token },
      body: data[2]
    })
    assert.ok(true)
  })

  it('Create a existing one should return 409', async () => {
    try {
      let session = await login(userA, password)
      await request({
        method: 'PUT',
        url: `${url}/avatars`,
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
        url: `${url}/avatars/2`,
        body: data[2]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by admin user should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'POST',
        url: `${url}/avatars/2`,
        auth: { bearer: session.token },
        body: data[1]
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'POST',
        url: `${url}/avatars/2`,
        auth: { bearer: session.token },
        body: data[2]
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${url}/avatars/3`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by owner should return 200', async () => {
    try {
      const session = await login(userB, password)
      await request({
        method: 'DELETE',
        url: `${url}/avatars/3`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})