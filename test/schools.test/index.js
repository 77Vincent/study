const assert = require('assert')

const data = require('./data')
const { login, request, URL } = require('../service')
const config = require('../../config')

describe('School', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/schools`, body: data[0] })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create by user = 201', async () => {
    for (let i = 0; i < data.length; i += 1) {
      const session = await login(config.ADMIN_ID, config.ADMIN_PASSWORD)
      const auth = { bearer: session.token }
      await request({
        method: 'PUT', url: `${URL}/schools`, auth, body: data[i],
      })
    }
    const res = await request({ url: `${URL}/schools` })
    assert.equal(res.body.length, data.length)
  })
})
