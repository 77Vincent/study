import c from '../config'

export default {
  loopObjOwn(obj = {}, callback) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        callback(key)
      }
    }
  },
  msToDay(millisecond) {
    return Math.floor(millisecond / 1000 / 60 / 60) / 24
  },
  prettyJSON(json) {
    return JSON.stringify(json, null, 2)
  },

  /**
   * Parse url querystring and return requesting querystring values
   * @param {string} querystring - format: &key=value&key=value1,value2 
   * @returns {object} each key-value pair is according to the querystring
   */
  parseQuerystring(querystring = '') {
    if (!querystring) { return {} }
    const arr = querystring.split('&')
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf('=') === -1) { break }
      const pair = arr[i].split('=')
      obj[pair[0]] = pair[1]
    }
    return obj
  },

  checkRange(range = {}, input = {}) {
    let result = {}
    this.loopObjOwn(range, key => {
      if (input[key] > range[key]) {
        result[key] = `Field "${key}" should not be bigger than ${range[key]}`
      }
    })

    if (Object.keys(result).length) {
      return result
    } else {
      return false
    }
  },

  batchExtractObj(sourceObj = {}, keys = []) {
    let body = {}
    keys.map(each => {
      let input = sourceObj[each]
      // Do not take properties that source object does not have
      // In case of passing null or undefined value to model
      // where some can not accept null value
      if (input !== undefined) {
        body[each] = input 
      }
    })
    return body
  },

  /**
   * Count offset for database query pagination
   * @param {number} page - page number, start from 1
   * @param {number} limit - items to display per page 
   * @returns 
   */
  getOffset(page = 1, limit = 50) {
    page = this.getPositiveInt(page)
    return page ? ( page - 1 ) * limit : 0
  },

  /**
   * Return an positive integer 
   * @param {number} [input=1] input number
   * @returns {number} positive integer
   */
  getPositiveInt(input = 1) {
    return !isNaN(input) ? Math.round(Math.abs(input)) : 1
  },

  /**
   * 
   * @param {object} object - source normal object that needs to be converted
   * @param {array} keys - array of values that the object's keys to be included
   * @returns {array} array contains objects in this format: [{key: value}, {key: value}]
   */
  objToObjGroupsInArr(object = {}, keys = []) {
    let arr = []
    this.loopObjOwn(object, key => {
      if (keys.indexOf(key) !== -1) {
        let value = decodeURI(object[key])
        // Do not filter with empty string
        if (value !== '') {
          arr.push({ [key]: value.split(',') })
        }
      }
    })
    return arr
  },

  simpleSend(ctx, data) {
    if (data) {
      ctx.status = 200
      ctx.body = this.prettyJSON(data)
    } else {
      ctx.status = 404
    }
  },

  logError(ctx, err) {
    console.error(err)
    ctx.throw(500, err)
  },

  getDomain(custom = '') {
    return `${c.protocol}://${c.host}:${c.port}${custom}`
  },
}