var assert = require('assert')
const request = require('request-promise-native')

const Database = require('../database.js')
const config = require('../config')
const dummy = require('./data/users')
const { Role, User } = require('../models')
const { login, options, modified, url } = require('./service')

before(async () => {
  await Database.dropAllSchemas()
  await Database.sync({ force: true })
  await Role.bulkCreate([{ label: 'admin' }, { label: 'teacher' }, { label: 'student' }])
  await User.create({
    role_id: 1,
    username: config.adminID,
    mobilephone: 123456789,
    password: config.adminPassword,
  })
})

describe('User', () => {
  it('Create a user should return 200', () => {
    dummy.map(async (each) => {
      const data = await request({
        method: 'PUT',
        url: `${url}/users`,
        body: each,
        json: true,
        resolveWithFullResponse: true
      })
    })
    assert.ok(true)
  })

  it('Update a user by admin should return 200', async () => {
    const session = await login(config.adminID, config.adminPassword)
    const data = await request(Object.assign(options, {
      url: `${url}/users/18811111111`,
      auth: { bearer: session.token },
      body: { school: modified, cost: 9999, gender: true, name: modified , bio: modified },
    }))
    assert.equal(data.statusCode, 200)
  })

  it('Update a user by its owner should return 200', async () => {
    const session = await login('18811111111', '000000')
    const data = await request(Object.assign(options, {
      url: `${url}/users/18811111111`,
      auth: { bearer: session.token },
      body: { school: modified, cost: 9999, gender: true, name: modified , bio: modified },
    }))
    assert.equal(data.statusCode, 200)
  })

  it('Update a user by other should return 403', async () => {
    const session = await login('18811111111', '000000')
    try {
      await request(Object.assign(options, {
        url: `${url}/users/18822222222`,
        auth: { bearer: session.token },
        body: { school: modified, cost: 9999, gender: true, name: modified , bio: modified },
      }))
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update with overlarge number should return 416', async () => {
    const session = await login('18811111111', '000000')
    try {
      await request(Object.assign(options, {
        url: `${url}/users/18811111111`,
        auth: { bearer: session.token },
        body: { cost: 99999 },
      }))
    } catch (err) {
      assert.equal(err.statusCode, 416)
    }
  })

  it('Delete a user by owner should rturn 200', async () => {
    const session = await login('18811111111', '000000')
    const data = await request(Object.assign(options, {
      method: 'DELETE',
      url: `${url}/users/18811111111`,
    }))
    assert.equal(data.statusCode, 200)
  })
})