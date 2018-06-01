var assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')
const config = require('../../config')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const password = '000000'

describe('Avatar', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/avatars`,
        body: data[0]
      })
    } catch(err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create by user should return 201', async () => {
    let session = await login(config.adminID, config.adminPassword)
    await request({
      method: 'PUT',
      url: `${url}/avatars`,
      auth: { bearer: session.token },
      body: data[0]
    })
    session = await login(userA, password)
    await request({
      method: 'PUT',
      url: `${url}/avatars`,
      auth: { bearer: session.token },
      body: data[1]
    })
    session = await login(userB, password)
    await request({
      method: 'PUT',
      url: `${url}/avatars`,
      auth: { bearer: session.token },
      body: data[2]
    })
    assert.ok(true)
  })

  it('Update by visitor should return 401', async () => {
    try {
      await request({
        method: 'POST',
        url: `${url}/avatars/2`,
        body: data[2]
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update by admin user should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'POST',
        url: `${url}/avatars/2`,
        auth: { bearer: session.token },
        body: data[1]
      })
    } catch(err) {
      assert.equal(err.statusCode, 200)
    }
  })

  it('Update by owner should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'POST',
        url: `${url}/avatars/2`,
        auth: { bearer: session.token },
        body: data[2]
      })
    } catch(err) {
      assert.equal(err.statusCode, 200)
    }
  })

  // it('Delete by visitor should return 401', async () => {
  //   try {
  //     await request({
  //       method: 'DELETE',
  //       url: `${url}/majors/1`,
  //       body: { description: modified, },
  //     })
  //   } catch (err) {
  //     assert.equal(err.statusCode, 401)
  //   }
  // })

  // it('Delete by admin should return 200', async () => {
  //   try {
  //     const session = await login(config.adminID, config.adminPassword)
  //     await request({
  //       method: 'DELETE',
  //       url: `${url}/majors/1`,
  //       auth: { bearer: session.token }
  //     })
  //   } catch(err) {
  //     assert.equal(err.statusCode, 200)
  //   }
  // })
})