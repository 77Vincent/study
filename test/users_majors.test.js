const assert = require('assert')

const { login, request, URL, USERS, PASSWORD } = require('./service')

describe('User_Major', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/users_majors`, body: { major_id: [2] }})
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    let session = await login(USERS[0].mobilephone, PASSWORD)
    let auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/users_majors`, auth, body: { major_id: [1, 2]}})
    await request({ method: 'PUT', url: `${URL}/users_majors`, auth, body: { major_id: [1, 7]}})

    session = await login(USERS[1].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/users_majors`, auth, body: { major_id: [2, 3]}})

    session = await login(USERS[2].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/users_majors`, auth, body: { major_id: [3, 4]}})

    session = await login(USERS[3].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/users_majors`, auth, body: { major_id: [4, 5]}})

    session = await login(USERS[4].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/users_majors`, auth, body: { major_id: [5, 6]}})

    session = await login(USERS[5].mobilephone, PASSWORD)
    auth = { bearer: session.token }
    await request({ method: 'PUT', url: `${URL}/users_majors`, auth, body: { major_id: [6, 7]}})

    const res = await request({ url: `${URL}/users_majors` })
    assert.equal(res.body.length, 12)
  })

  it('Delete should return 200', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      await request({ method: 'DELETE', url: `${URL}/users_majors/1`, auth: { bearer: session.token }})
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})