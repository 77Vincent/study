var assert = require('assert')
const request = require('request-promise-native')

const { login, options, modified, url } = require('./service')

describe('Tag', function() {
  it('Update a tag by its owner should return 200', async function() {
    const session = await login('18811111111', '000000')
    const data = await request(Object.assign(options, {
      url: `${url}/tags/2`,
      auth: { bearer: session.token },
      body: { content: modified, },
     }))

    assert.equal(data.statusCode, 200)
  })

  it('Update a tag by other should return 403', async function() {
    const session = await login('18822222222', '000000')
    try {
      await request(Object.assign(options, {
        url: `${url}/tags/2`,
        auth: { bearer: session.token },
        body: { content: modified, },
      }))
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })
})