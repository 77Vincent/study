export default {
  fetchConfig: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  },

  fetch(url, config = this.fetchConfig) {
    return new Promise((resolve, reject) => {
      window.fetch(url, config)
        .then(res => res.json())
        .then(result => {resolve(result)})
        .catch(error => { 
          reject(error);
        });
    });
  }
}