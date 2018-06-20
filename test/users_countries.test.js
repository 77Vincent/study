const assert = require('assert')

const {
  login, request, URL, USERS, PASSWORD,
} = require('./service')

describe('User_Country', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/users_countries`, body: { country_id: [2] } })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create = 200', async () => {
    let session = await login(USERS[0].mobilephone, PASSWORD)
    let auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_countries`, auth, body: { country_id: [1] },
    })

    session = await login(USERS[1].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_countries`, auth, body: { country_id: [2] },
    })

    session = await login(USERS[2].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_countries`, auth, body: { country_id: [3] },
    })

    session = await login(USERS[3].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_countries`, auth, body: { country_id: [4] },
    })

    session = await login(USERS[4].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_countries`, auth, body: { country_id: [2, 4, 6] },
    })

    session = await login(USERS[5].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({
      method: 'PUT', url: `${URL}/users_countries`, auth, body: { country_id: [1, 3, 5] },
    })

    const res = await request({ url: `${URL}/users_countries` })
    assert.equal(res.body.length, 10)
  })
})
