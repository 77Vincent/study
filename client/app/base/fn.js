const fetchConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'include',
}

const fetch = (url, config = fetchConfig) => {
  return new Promise((resolve, reject) => {
    window.fetch(url, config)
      .then(res => res.json())
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

async function register () {
  this.loading()

  const header = {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }) 
  }
}


async function login (credentials = { username: null, password: null}) {
  this.loading()

  const { username, password } = credentials

  const header = {
    method:"POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }) 
  }

  const res = await window.fetch('/api/sessions', header)
  const result = await res.json()

  if (res.status === 200) {
    this.setState({
      user: result.data,
    })
  }

  this.loaded()
}

async function logout () {
  this.loading()

  const res = await window.fetch('/api/sessions', {
    method:"DELETE",
    credentials: 'include'
  })

  if (res.status === 200) {
    this.setState({
      user: null
    })
    this.loaded()
  }
}

export {
  fetch,
  register,
  login,
  logout
}