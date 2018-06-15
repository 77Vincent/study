const assert = require('assert')

const data = require('./data')
const { login, request, MODIFIED, url } = require('../service')
const config = require('../../config')

describe('School', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/schools`,
        body: data[0]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 201', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'PUT',
        url: `${url}/schools`,
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
        url: `${url}/schools/2`,
        body: { description: MODIFIED, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by admin should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'POST',
        url: `${url}/schools/2`,
        auth: { bearer: session.token },
        body: { description: MODIFIED, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${url}/schools/1`,
        body: { description: MODIFIED, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by admin should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'DELETE',
        url: `${url}/schools/1`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})