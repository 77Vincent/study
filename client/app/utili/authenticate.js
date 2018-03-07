'use strict'

const createFetchConfig = (method = 'GET', body = {}) => {
  return {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body
  }
}

async function register () {
  const res = await window.fetch(
    '/api/users', 
    createFetchConfig('POST', JSON.stringify())
  )
}

async function login (username, password) {
  const res = await window.fetch(
    '/api/sessions', 
    createFetchConfig('POST', JSON.stringify({ username, password }))
  )
  return res
}

async function logout () {
  const res = await window.fetch(
    '/api/sessions', 
    createFetchConfig('DELETE')
  )
  return res
}

export {
  register,
  login,
  logout
}