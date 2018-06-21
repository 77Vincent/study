const assert = require('assert')

const data = require('./data')
const {
  login, request, URL, PASSWORD, USERS,
} = require('../service')

describe('Portfolio', () => {
  it('Create by visitor = 401', async () => {
    try {
      await request({ method: 'PUT', url: `${URL}/portfolios`, body: data[0] })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create without body = 400', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      await request({ method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token } })
    } catch (err) {
      assert.equal(err.statusCode, 400)
    }
  })

  it('Create by user = 201', async () => {
    let session = await login(USERS[0].mobilephone, PASSWORD)
    await request({
      method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token }, body: data[0],
    })

    session = await login(USERS[1].mobilephone, PASSWORD)
    await request({
      method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token }, body: data[1],
    })

    session = await login(USERS[2].mobilephone, PASSWORD)
    await request({
      method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token }, body: data[2],
    })

    session = await login(USERS[3].mobilephone, PASSWORD)
    await request({
      method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token }, body: data[3],
    })

    session = await login(USERS[4].mobilephone, PASSWORD)
    await request({
      method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token }, body: data[0],
    })

    session = await login(USERS[5].mobilephone, PASSWORD)
    await request({
      method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token }, body: data[1],
    })

    const res = await request({ url: `${URL}/portfolios` })
    assert.equal(res.body.length, USERS.length)
  })

  it('Create a existing one = 409', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      await request({
        method: 'PUT', url: `${URL}/portfolios`, auth: { bearer: session.token }, body: data[1],
      })
    } catch (err) {
      assert.equal(err.statusCode, 409)
    }
  })

  it('Update by visitor = 401', async () => {
    try {
      await request({ method: 'POST', url: `${URL}/portfolios/2`, body: data[2] })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by owner = 200', async () => {
    try {
      const session = await login(USERS[0].mobilephone, PASSWORD)
      const auth = { bearer: session.token }
      await request({
        method: 'POST', url: `${URL}/portfolios/${session.data.portfolio_id}`, auth, body: data[0],
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})
