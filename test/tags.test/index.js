var assert = require('assert')

const data = require('./data')
const { login, request, modified, url } = require('../service')

describe('Tag', function() {
  it('Create tags should return 200', async () => {
    for (let i = 0; i < data.length; i++) {
      const session = await login('18822222222', '000000')
      await request({
        method: 'PUT',
        url: `${url}/tags`,
        auth: { bearer: session.token },
        body: data[i]
      })
    }
    assert.ok(true)
  })

  it('Update a tag by visitor should return 401', async function() {
    try {
      await request({
        method: 'POST',
        url: `${url}/tags/2`,
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Update a tag by other user should return 403', async function() {
    const session = await login('18833333333', '000000')
    try {
      await request({
        method: 'POST',
        url: `${url}/tags/2`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Update a tag by owner should return 200', async function() {
    const session = await login('18822222222', '000000')
    const response = await request({
      method: 'POST',
      url: `${url}/tags/2`,
      auth: { bearer: session.token },
      body: { content: modified, },
     })

    assert.equal(response.statusCode, 200)
  })

  it('Delete a tag by visitor should return 401', async function() {
    try {
      const response = await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 401)
    }
  })

  it('Delete a tag by other user should return 403', async function() {
    try {
      const session = await login('18833333333', '000000')
      const response = await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 403)
    }
  })

  it('Delete a tag by owner should return 200', async function() {
    try {
      const session = await login('18822222222', '000000')
      const response = await request({
        method: 'DELETE',
        url: `${url}/tags/1`,
        auth: { bearer: session.token },
        body: { content: modified, },
      })
    } catch (err) {
      assert.equal(err.statusCode, 200)
    }
  })
})