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

  getOffset(page = 1, limit = 50) {
    return Number(page) ? (page - 1) * limit : 0
  },

  logError(ctx, err) {
    console.error(err)
    ctx.throw(500, err)
  },

  getDomain(custom = '') {
    if (env === 'development') {
      return `${config.PROTOCOL}://${config.HOST}:${config.PORT}${custom}`
    }
    return `${config.PROTOCOL}://${config.HOST}${custom}`
  },
}
