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
  const { prefix, username, mobilephone, password, role } = values
  const res = await window.fetch(
    '/api/users', 
    createFetchConfig('POST', JSON.stringify({username, mobilephone, password, role}))
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
  const { username, password } = values
  const res = await window.fetch(
    '/api/sessions', 
    createFetchConfig('POST', JSON.stringify({ username, password }))
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
  logout
}