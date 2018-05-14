var assert = require('assert')
const request = require('request-promise-native')

const { login, options, modified, url } = require('./service')

describe('User', () => {
  it('Update a user by its owner should return 200', async () => {
    const session = await login('18822222222', '000000')
    const data = await request(Object.assign(options, {
      url: `${url}/users/3`,
      auth: { bearer: session.token },
      body: { username: modified, cost: 9999, gender: true, name: modified , bio: modified },
    }))

    assert.equal(data.statusCode, 200)
  })

  it('Update a user by other should return 403', async () => {
    const session = await login('18811111111', '000000')
    try {
      await request(Object.assign(options, {
        url: `${url}/users/3`,
        auth: { bearer: session.token },
        body: { username: modified, cost: 9999, gender: true, name: modified , bio: modified },
      }))
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })
})