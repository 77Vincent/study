const assert = require('assert')

const data = require('../static/resources/majors')
const { login, request, URL } = require('./service')
const config = require('../config')

describe('Major', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/majors`, body: data[0] })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create by user = 201', async () => {
    for (let i = 0; i < data.length; i += 1) {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'PUT', url: `${URL}/majors`, auth: { bearer: session.token }, body: data[i],
      })
    }
    const res = await request({ url: `${URL}/majors` })
    assert.equal(res.body.length, data.length)
  })
})
