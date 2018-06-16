const assert = require('assert')

const data = require('../static/resources/majors')
const { login, request, MODIFIED, URL } = require('./service')
const config = require('../config')

describe('Major', () => {
  it('Create = 201', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(config.adminID, config.adminPassword)
      await request({ method: 'PUT', url: `${URL}/majors`, auth: { bearer: session.token }, body: data[i] })
    }
    const res = await request({ url: `${URL}/majors` })
    assert.equal(res.body.length, data.length)
  })

  it('Update by visitor = 401', async () => {
    try {
      await request({ method: 'POST', url: `${URL}/majors/2`, body: { description: MODIFIED, } })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })
})