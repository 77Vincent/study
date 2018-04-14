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

export const Request = {
  // users
  getUser: async (filter = {}) => {
    console.log(filter)
    let querystring = ''
    for (let key in filter) {
      querystring += `&${key}=${filter[key].toString()}`
    }
    const res = await window.fetch( `/api/users?${querystring.slice(1)}`)
    return res
  },
  signUp: async (values) => {
    const res = await window.fetch(
      '/api/users', 
      createFetchConfig('PUT', JSON.stringify(values))
    )
    return res
  },
  userUpdate: async (values) => {
    const res = await window.fetch(
      `/api/users/${values.id}`, 
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

  // sessions 
  signIn: async (values = { id: null, password: null}) => {
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
