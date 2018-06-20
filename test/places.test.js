const assert = require('assert')

const data = require('../static/resources/places')
const { login, request, URL } = require('./service')
const config = require('../config')

describe('Place', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/places`, body: data[0] })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create by user = 201', async () => {
    for (let i = 0; i < data.length; i += 1) {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'PUT', url: `${URL}/places`, auth: { bearer: session.token }, body: data[i],
      })
    }
    const res = await request({ url: `${URL}/places` })
    assert.equal(res.body.length, data.length)
  })
})
