const queryString = require('query-string')

const config = require('../config')
const R = require('ramda')

const env = process.env.NODE_ENV

module.exports = {
  msToDay(millisecond) {
    return Math.floor(millisecond / 1000 / 60 / 60) / 24
  },
  timer(hours = 0) {
    return new Date(new Date().getTime() + Number(hours * 3600 * 1000))
  },

  /**
   * Parse url querystring and return requesting querystring values
   * @param {String} querystring - format: &key=value&key=value1,value2
   * @returns {Object} each key-value pair is according to the querystring
   */
  parseQuerystring(querystring = '') {
    return queryString.parse(querystring)
  },

  checkRange(range = {}, input = {}) {
    const result = {}
    R.forEachObjIndexed((value, key) => {
      if (input[key] > value) {
        result[key] = `Field "${key}" should not be bigger than ${value}`
      }
    }, range)

    if (Object.keys(result).length) {
      return result
    }
    return false
  },

  /**
   * Count offset for database query pagination
   * @param {Number} [page=1] - page number, start = require(1
   * @param {Number} [limit=50] - items to display per page
   * @returns
   */
  getOffset(inputPage = 1, limit = 50) {
    const page = this.getPositiveInt(inputPage)
    return page ? (page - 1) * limit : 0
  },

  /**
   * Return an positive integer
   * @param {Number} [input=1] input number
   * @returns {Number} positive integer
   */
  getPositiveInt(input = 1) {
    return R.is(Number, input) ? Math.round(Math.abs(input)) : 1
  },

  /**
   * Create a sequelize specific object for its filter
   * @param {Object} [object={}] - source normal object that needs to be converted
   * @param {Array} [keys=[]] - array of values that the object's keys to be included
   * @returns {Array} array contains objects in this format: [{key: value}, {key: value}]
   */
  getFilter(object = {}, keys = []) {
    const arr = []
    R.forEachObjIndexed((value, key) => {
      if (R.contains(key, keys)) {
        const query = decodeURI(value)
        // Do not filter with empty string
        if (query !== '') {
          arr.push({ [key]: query.split(',') })
        }
      }
    }, object)
    return arr
  },

  logError(ctx, err) {
    console.error(err)
    ctx.throw(500, err)
  },

  getDomain(custom = '') {
    if (env === 'development') {
      return `${config.protocol}://${config.host}:${config.port}${custom}`
    }
    return `${config.protocol}://${config.host}${custom}`
  },
}
