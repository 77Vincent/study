var assert = require('assert')
const request = require('request-promise-native')

const login = require('./login')
const config = require('../config')
const url = `${config.protocol}://${config.host}:${config.port}/api`
const modified = 'THIS FIELD HAS BEEN MODIFIED FOR TESTING PURPOSE'
const options = {
  method: 'POST',
  json: true,
  resolveWithFullResponse: true
}

describe('update', function() {
  it('successufully update a user should return 200', async function() {
    const session = await login('18822222222', '000000')
    const data = await request(Object.assign(options, {
      url: `${url}/users/3`,
      auth: { bearer: session.token },
      body: { username: modified, cost: 9999, gender: true, name: modified , bio: modified },
    }))

    assert.equal(data.statusCode, 200)
  })

  it('successufully update a tag should return 200', async function() {
    const session = await login('18822222222', '000000')
    const data = await request(Object.assign(options, {
      url: `${url}/tags/2`,
      auth: { bearer: session.token },
      body: { content: modified, },
     }))

    assert.equal(data.statusCode, 200)
  })
})