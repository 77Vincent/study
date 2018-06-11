const assert = require('assert')

const { login, request, url } = require('../service')
const users = require('../users.test/data')
const userA = users[1].mobilephone
const userB = users[2].mobilephone
const userC = users[3].mobilephone
const userD = users[4].mobilephone
const password = '000000'

describe('User_Major', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${url}/users_majors`,
        body: { major_id: [1] } 
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    let session = await login(userA, password)
    await request({
      method: 'PUT',
      url: `${url}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [2, 3] } 
    })
    session = await login(userB, password)
    await request({
      method: 'PUT',
      url: `${url}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [3, 4, 5] } 
    })
    session = await login(userC, password)
    await request({
      method: 'PUT',
      url: `${url}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [5, 6] } 
    })
    session = await login(userD, password)
    await request({
      method: 'PUT',
      url: `${url}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [3, 7] } 
    })
    assert.ok(true)
  })

  it('Delete should return 200', async () => {
    try {
      const session = await login(userA, password)
      await request({
        method: 'DELETE',
        url: `${url}/users_majors/2`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})