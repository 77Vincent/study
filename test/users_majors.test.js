const assert = require('assert')

const { login, request, URL } = require('./service')
const users = require('./users.test/data')
const user1 = users[1].mobilephone
const user2 = users[2].mobilephone
const user3 = users[3].mobilephone
const user4 = users[4].mobilephone
const PASSWORD = '000000'

describe('User_Major', () => {
  it('Create by visitor should return 401', async () => {
    try {
      await request({
        method: 'PUT',
        url: `${URL}/users_majors`,
        body: { major_id: [2] } 
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Create should return 200', async () => {
    let session = await login(user1, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [2] } 
    })
    await request({
      method: 'PUT',
      url: `${URL}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [2, 3, 4, 5, 6] } 
    })
    session = await login(user2, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [3, 4, 5] } 
    })
    session = await login(user3, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [5, 6] } 
    })
    session = await login(user4, PASSWORD)
    await request({
      method: 'PUT',
      url: `${URL}/users_majors`,
      auth: { bearer: session.token },
      body: { major_id: [3, 7] } 
    })
    assert.ok(true)
  })

  it('Delete should return 200', async () => {
    try {
      const session = await login(user1, PASSWORD)
      await request({
        method: 'DELETE',
        url: `${URL}/users_majors/2`,
        auth: { bearer: session.token }
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})