const assert = require('assert')

const data = require('./data')
const { login, request, URL } = require('../service')
const config = require('../../config')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const userC = users[3].mobilephone
const PASSWORD = '000000'
const toUpdate = {
  unit_price: 999,
  total_price: 999,
  length: 9
}

describe('Orders', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/orders`,
        body: data[0]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create by user should return 200', async () => {
    try {
      let session = await login(userA, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/orders`,
        auth: { bearer: session.token },
        body: data[0]
      })
      session = await login(userB, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/orders`,
        auth: { bearer: session.token },
        body: data[1]
      })
      session = await login(userC, PASSWORD)
      await request({
        method: 'PUT',
        url: `${URL}/orders`,
        auth: { bearer: session.token },
        body: data[2]
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Get by visitor should return 401', async () => {
    try {
      await request({ url: `${URL}/orders` })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Get by admin user should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        url: `${URL}/orders`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Get by user should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      await request({
        url: `${URL}/orders`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Update by visitor should return 401', async () => {
    try {
      await request({
        method: 'POST',
        url: `${URL}/orders/2`,
        body: toUpdate
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by admin user should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      const orders = await request({ url: `${URL}/orders`, auth: { bearer: session.token } })
      await request({
        method: 'POST',
        url: `${URL}/orders/${orders.body[1].id}`,
        auth: { bearer: session.token },
        body: toUpdate
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(userB, PASSWORD)
      const orders = await request({ url: `${URL}/orders`, auth: { bearer: session.token } })
      await request({
        method: 'POST',
        url: `${URL}/orders/${orders.body[1].id}`,
        auth: { bearer: session.token },
        body: toUpdate
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Delete by visitor should return 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${URL}/orders/3`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete by owner should return 200', async () => {
    try {
      const session = await login(userA, PASSWORD)
      const orders = await request({ url: `${URL}/orders`, auth: { bearer: session.token } })
      await request({
        method: 'DELETE',
        url: `${URL}/orders/${orders.body[0].id}`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})