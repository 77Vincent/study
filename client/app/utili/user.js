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

async function signUp (values) {
  const res = await window.fetch(
    '/api/users', 
    createFetchConfig('PUT', JSON.stringify(values))
  )
  return res
}

async function userUpdate (values) {
  const res = await window.fetch(
    `/api/users/${values.username}`, 
    createFetchConfig('POST', JSON.stringify(values))
  )
  return res
}

async function logout () {
  const res = await window.fetch(
    '/api/users', 
    createFetchConfig('DELETE')
  )
  return res
}

async function signIn (values = { username: null, password: null}) {
  const res = await window.fetch(
    '/api/sessions', 
    createFetchConfig('POST', JSON.stringify(values))
  )
  return res
}

async function signOut () {
  const res = await window.fetch(
    '/api/sessions', 
    createFetchConfig('DELETE')
  )
  return res
}

export {
  signIn,
  signOut,
  signUp,
  logout,
  userUpdate
}