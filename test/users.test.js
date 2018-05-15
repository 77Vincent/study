var assert = require('assert')

const Database = require('../database.js')
const config = require('../config')
const dummy = require('./data/users')
const { Role, User } = require('../models')
const { login, request, modified, url } = require('./service')

before(async () => {
  // Clear database
  await Database.dropAllSchemas()
  await Database.sync({ force: true })
  // Create roles and admin user
  await Role.bulkCreate([{ label: 'admin' }, { label: 'teacher' }, { label: 'student' }])
  await User.create({ role_id: 1, username: config.adminID, mobilephone: 123456789, password: config.adminPassword })
})

describe('User', () => {
  it('Create users should return 200', async () => {
    for (let i = 0; i < dummy.length; i++) {
      await request({ method: 'PUT', url: `${url}/users`, body: dummy[i] })
    }
    assert.ok(true)
  })

  it('Update a user by visitor should return 401', async () => {
    try {
      await request({
        url: `${url}/users/18811111111`,
        body: { school: modified, cost: 9999, gender: true, name: modified , bio: modified },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update a user by other user should return 403', async () => {
    const session = await login('18811111111', '000000')
    try {
      await request({
        url: `${url}/users/18822222222`,
        auth: { bearer: session.token },
        body: { school: modified, cost: 9999, gender: true, name: modified , bio: modified },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update with not satisfiable input should return 416', async () => {
    const session = await login('18811111111', '000000')
    try {
      await request({
        url: `${url}/users/18811111111`,
        auth: { bearer: session.token },
        body: { cost: 99999 },
      })
    } catch (err) {
      assert.equal(err.statusCode, 416)
    }
  })

  it('Update a user by admin should return 200', async () => {
    const session = await login(config.adminID, config.adminPassword)
    const data = await request({
      url: `${url}/users/18811111111`,
      auth: { bearer: session.token },
      body: { school: modified, cost: 9999, gender: true, name: modified , bio: modified },
    })
    assert.equal(data.statusCode, 200)
  })

  it('Update a user by its owner should return 200', async () => {
    const session = await login('18811111111', '000000')
    const data = await request({
      url: `${url}/users/18811111111`,
      auth: { bearer: session.token },
      body: { school: modified, cost: 9999, gender: true, name: modified , bio: modified },
    })
    assert.equal(data.statusCode, 200)
  })

  it('Delete a user by visitor should rturn 401', async () => {
    try {
      await request({
        method: 'DELETE',
        url: `${url}/users/18811111111`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete a user by other user should rturn 403', async () => {
    const session = await login('18822222222', '000000')
    try {
      await request({
        method: 'DELETE',
        auth: { bearer: session.token },
        url: `${url}/users/18811111111`,
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete a user by owner should rturn 200', async () => {
    const session = await login('18811111111', '000000')
    const data = await request({
      method: 'DELETE',
      auth: { bearer: session.token },
      url: `${url}/users/18811111111`,
    })
    assert.equal(data.statusCode, 200)
  })
})