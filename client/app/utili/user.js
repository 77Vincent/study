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

export default {
  signUp: async (values) => {
    const res = await window.fetch(
      '/api/users', 
      createFetchConfig('PUT', JSON.stringify(values))
    )
    return res
  },
  userUpdate: async (values) => {
    const res = await window.fetch(
      `/api/users/${values.username}`, 
      createFetchConfig('POST', JSON.stringify(values))
    )
    return res
  },
  logout: async () => {
    const res = await window.fetch(
      '/api/users', 
      createFetchConfig('DELETE')
    )
    return res
  },
  signIn: async (values = { username: null, password: null}) => {
    const res = await window.fetch(
      '/api/sessions', 
      createFetchConfig('POST', JSON.stringify(values))
    )
    return res
  },
  signOut: async () => {
    const res = await window.fetch(
      '/api/sessions', 
      createFetchConfig('DELETE')
    )
    return res
  }
}
