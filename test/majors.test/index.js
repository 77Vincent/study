var assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')
const config = require('../../config')

describe('Major', function() {
  it('Create should return 201', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'PUT',
        url: `${url}/majors`,
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
        url: `${url}/majors/2`,
        body: { description: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by admin should return 200', async function() {
    const session = await login(config.adminID, config.adminPassword)
    const response = await request({
      method: 'POST',
      url: `${url}/majors/2`,
      auth: { bearer: session.token },
      body: { description: modified, },
     })
    assert.equal(response.statusCode, 200)
  })

  it('Delete by visitor should return 401', async function() {
    try {
      const response = await request({
        method: 'DELETE',
        url: `${url}/majors/1`,
        body: { description: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by admin should return 200', async function() {
    const session = await login(config.adminID, config.adminPassword)
    const response = await request({
      method: 'DELETE',
      url: `${url}/majors/1`,
      auth: { bearer: session.token }
     })
    assert.equal(response.statusCode, 200)
  })
})