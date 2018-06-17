const assert = require('assert')

const data = require('./data')
const { login, request, URL } = require('../service')
const config = require('../../config')

describe('Class_Course', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/classes_courses`,
        body: data[0],
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'PUT',
        url: `${URL}/classes_courses`,
        auth: { bearer: session.token },
        body: data[i],
      })
    }
    assert.ok(true)
  })

  it('Delete should return 200', async () => {
    try {
      const session = await login(config.adminID, config.adminPassword)
      await request({
        method: 'DELETE',
        url: `${URL}/classes_courses`,
        auth: { bearer: session.token },
        body: { course_id: 2, class_id: 2 },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})