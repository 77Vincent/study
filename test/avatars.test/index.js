const assert = require('assert')

const data = require('./data')
const { login, request, URL, PASSWORD, USERS } = require('../service')

describe('Avatar', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/avatars`, body: data[0] })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create without body eturn 400', async () => {
    try {
      let session = await login(USERS[0].mobilephone, PASSWORD)
      await request({ method: 'PUT', url: `${URL}/avatars`, auth: { bearer: session.token }})
    } catch (err) {
      assert.equal(err.statusCode, 400)
    }
  })

  it('Create by user should return 201', async () => {
    let session = await login(USERS[0].mobilephone, PASSWORD)
    await request({ method: 'PUT', url: `${URL}/avatars`, auth: { bearer: session.token }, body: data[0] })

    session = await login(USERS[1].mobilephone, PASSWORD)
    await request({ method: 'PUT', url: `${URL}/avatars`, auth: { bearer: session.token }, body: data[1] })
    session = await login(USERS[2].mobilephone, PASSWORD)

    await request({ method: 'PUT', url: `${URL}/avatars`, auth: { bearer: session.token }, body: data[2] })
    session = await login(USERS[3].mobilephone, PASSWORD)

    await request({ method: 'PUT', url: `${URL}/avatars`, auth: { bearer: session.token }, body: data[3] })

    const res = await request({ url: `${URL}/avatars` })
    assert.equal(res.body.length, data.length)
  })

  it('Create a existing one should return 409', async () => {
    try {
      let session = await login(USERS[0].mobilephone, PASSWORD)
      await request({ method: 'PUT', url: `${URL}/avatars`, auth: { bearer: session.token }, body: data[1] })
    } catch (err) {
      assert.equal(err.statusCode, 409)
    }
  })

  it('Update by visitor should return 401', async () => {
    try {
      await request({ method: 'POST', url: `${URL}/avatars/2`, body: data[2] })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      const auth = { bearer: session.token }
      await request({ method: 'POST', url: `${URL}/avatars/${session.data.avatar_id}`, auth, body: data[0] })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})