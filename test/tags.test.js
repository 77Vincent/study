const assert = require('assert')

const { login, request, URL, PASSWORD, USERS } = require('./service')

describe('Tag', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/tags`, body: { content: '' }})
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create = 200', async () => {
    let session = await login(USERS[0].mobilephone, PASSWORD)
    let auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/tags`, auth, body: { content: '口才好' }})
    await request({ method: 'PUT', url: `${URL}/tags`, auth, body: { content: '帅气' }})

    session = await login(USERS[1].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/tags`, auth, body: { content: '厉害' }})
    await request({ method: 'PUT', url: `${URL}/tags`, auth, body: { content: '自学成才' }})

    session = await login(USERS[2].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/tags`, auth, body: { content: '童寿无欺' }})
    await request({ method: 'PUT', url: `${URL}/tags`, auth, body: { content: '顽强' }})

    session = await login(USERS[3].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/tags`, auth, body: { content: '比唐僧唠叨' }})

    const res = await request({ url: `${URL}/tags` })
    assert.equal(res.body.length, 7)
  })

  it('Delete by visitor = 401', async () => {
    try {
      await request({ method: 'DELETE', url: `${URL}/tags/1` })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by other user = 403', async () => {
    try {
      const session = await login(USERS[3].mobilephone, PASSWORD)
      const auth = { bearer: session.token }
      await request({ method: 'DELETE', url: `${URL}/tags/1`, auth })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete by owner = 200', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      const auth = { bearer: session.token }
      await request({ method: 'DELETE', url: `${URL}/tags/1`, auth })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})