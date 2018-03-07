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

async function login (username, password) {
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
  return res
}

async function logout () {
  const res = await window.fetch('/api/sessions', {
    method:"DELETE",
    credentials: 'include'
  })

  return res
}

export {
  fetch,
  register,
  login,
  logout
}