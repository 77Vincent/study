const assert = require('assert')

const { login, request, url, password } = require('./service')
const users = require('./users.test/data')
const user1 = users[2].mobilephone
const user2 = users[3].mobilephone
const user3 = users[4].mobilephone
const user4 = users[5].mobilephone

describe('Tag', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${url}/tags`, body: { content: '' }})
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create = 200', async () => {
    let session = await login(user1, password)
    let auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${url}/tags`, auth, body: { content: '口才好' }})
    await request({ method: 'PUT', url: `${url}/tags`, auth, body: { content: '帅气' }})

    session = await login(user2, password)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${url}/tags`, auth, body: { content: '厉害' }})
    await request({ method: 'PUT', url: `${url}/tags`, auth, body: { content: '自学成才' }})

    session = await login(user3, password)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${url}/tags`, auth, body: { content: '童寿无欺' }})
    await request({ method: 'PUT', url: `${url}/tags`, auth, body: { content: '顽强' }})

    session = await login(user4, password)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${url}/tags`, auth, body: { content: '比唐僧唠叨' }})

    const res = await request({ url: `${url}/tags` })
    assert.equal(res.body.length, 7)
  })

  it('Delete by visitor = 401', async () => {
    try {
      await request({ method: 'DELETE', url: `${url}/tags/1` })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by other user = 403', async () => {
    try {
      const session = await login(user2, password)
      const auth = { bearer: session.token }
      await request({ method: 'DELETE', url: `${url}/tags/1`, auth })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete by owner = 200', async () => {
    try {
      const session = await login(user1, password)
      const auth = { bearer: session.token }
      await request({ method: 'DELETE', url: `${url}/tags/1`, auth })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})