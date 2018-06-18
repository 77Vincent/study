const assert = require('assert')

const data = require('../static/resources/locale/countries.json')
const { login, request, URL } = require('./service')
const config = require('../config')

describe('Country', () => {
  it('Create = 201', async () => {
    for (let i = 0; i < data.length; i += 1) {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'PUT', url: `${URL}/countries`, auth: { bearer: session.token }, body: data[i],
      })
    }
    const res = await request({ url: `${URL}/countries` })
    assert.equal(res.body.length, data.length)
  })
})
