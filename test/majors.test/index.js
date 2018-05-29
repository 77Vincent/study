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
})