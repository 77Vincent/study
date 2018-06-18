const assert = require('assert')

const {
  login, request, URL, USERS, PASSWORD,
} = require('./service')

describe('User_School', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/users_schools`, body: { school_id: [2] } })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create = 200', async () => {
    let session = await login(USERS[0].mobilephone, PASSWORD)
    let auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_schools`, auth, body: { school_id: [1] },
    })

    session = await login(USERS[1].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_schools`, auth, body: { school_id: [2] },
    })

    session = await login(USERS[2].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_schools`, auth, body: { school_id: [3] },
    })

    session = await login(USERS[3].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_schools`, auth, body: { school_id: [4] },
    })

    session = await login(USERS[4].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_schools`, auth, body: { school_id: [1, 3, 5] },
    })

    session = await login(USERS[5].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_schools`, auth, body: { school_id: [2, 4, 6] },
    })

    const res = await request({ url: `${URL}/users_schools` })
    assert.equal(res.body.length, 10)
  })

  it('Delete = 200', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      await request({ method: 'DELETE', url: `${URL}/users_schools/1`, auth: { bearer: session.token } })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})
