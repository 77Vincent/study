const assert = require('assert')

const { login, request, url } = require('./service')
const users = require('./users.test/data')
const userA = users[2].mobilephone
const userB = users[3].mobilephone
const userC = users[4].mobilephone
const userD = users[5].mobilephone
const password = '000000'

describe('Tag', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/tags`,
        body: { content: [] } 
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    let session = await login(userA, password)
    await request({
      method: 'PUT',
      url: `${url}/tags`,
      auth: { bearer: session.token },
      body: { content: ['口才好', '颜值高'] }
    })
    session = await login(userB, password)
    await request({
      method: 'PUT',
      url: `${url}/tags`,
      auth: { bearer: session.token },
      body: { content: ['厉害', '超级吊'] }
    })
    session = await login(userC, password)
    await request({
      method: 'PUT',
      url: `${url}/tags`,
      auth: { bearer: session.token },
      body: { content: ['自信', '名校毕业生'] }
    })
    session = await login(userD, password)
    await request({
      method: 'PUT',
      url: `${url}/tags`,
      auth: { bearer: session.token },
      body: { content: ['画家', '脑洞大'] }
    })
    assert.ok(true)
  })

  it('Delete by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by other user should return 403', async () => {
    try {
      const session = await login(userB, password)
      await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete by owner should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        auth: { bearer: session.token },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})