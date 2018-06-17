const assert = require('assert')

const data = require('../static/resources/locale/countries.json')
const { login, request, URL } = require('./service')
const config = require('../config')

describe('Country', () => {
  it('Create = 201', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(config.adminID, config.adminPassword)
      await request({ method: 'PUT', url: `${URL}/locations`, auth: { bearer: session.token }, body: data[i] })
    }
    const res = await request({ url: `${URL}/locations` })
    assert.equal(res.body.length, data.length)
  })
})