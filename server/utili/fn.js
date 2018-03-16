export default {
  prettyJSON(json) {
    return JSON.stringify(json, null, 2)
  },
  parseQuerystring(querystring = [], key = '') {
    const arr = querystring.split('&')
    for (let i = 0; i < arr.length; i++) {
      const query = arr[i].split('=')
      if (query[0] === key) {
        return query[1]
      }
    }
  }
}