const Sequelize = require('sequelize')
const querystring = require('querystring')

const { Op } = Sequelize

const is = input => Object.prototype.toString.call(input)

/**
 * This is a Class used for quick filtering and searching in sequelize
 * @class Filter
 * @param {Object} queryObject The source input of filtering or searching, key is label, value is content
 * @return {Object} Plain object that can be directly used for sequelize query
 */
class Filter {
  constructor(inputQuerystring = '', options = {}) {
    if (is(inputQuerystring) !== '[object String]') {
      throw new Error('The first argument: the input querystring should be type of String')
    }
    if (is(options) !== '[object Object]') {
      throw new Error('The second argument: options should be type of Object')
    }

    const readyQuerystring = `${inputQuerystring}&${querystring.stringify(options.preFilter)}`

    this.options = options
    this.queryObject = {}
    Object.assign(this.queryObject, querystring.parse(readyQuerystring))

    // Process alias
    Object.keys(options.alias || []).map((key) => {
      const alias = options.alias[key]
      // Remove the origin property
      if (Object.prototype.hasOwnProperty.call(this.queryObject, key)) {
        delete this.queryObject[key]
      }
      // Add a new property using alias and give it origin value
      if (Object.prototype.hasOwnProperty.call(this.queryObject, alias)) {
        this.queryObject[key] = this.queryObject[alias]
        delete this.queryObject[alias]
      }
      return null
    })
  }

  filterBy(keys = []) {
    // Add keys in preFilter
    Object.keys(this.options.preFilter || []).map((key) => {
      keys.push(key)
      return null
    })

    const source = this.queryObject
    Object.keys(source).map((key) => {
      if (keys.indexOf(key) !== -1) {
        const queryValue = source[key]
        if (queryValue !== undefined && queryValue !== null && queryValue !== '') {
          switch (is(queryValue)) {
            case '[object Array]':
              this[key] = decodeURI(queryValue).split(',')
              break
            default:
              this[key] = decodeURI(queryValue)
          }
        }
      }
      return null
    })
    return this
  }

  searchBy(keys = []) {
    const { search } = this.queryObject

    const arr = keys.map(value => ({
      [value]: {
        [Op.like]: `%${decodeURI(search)}%`,
      },
    }))

    if (search) {
      this[Op.or] = arr
    }
    return this
  }

  done() {
    // Return plain object for sequelize
    const obj = {}
    Object.keys(this).map((key) => {
      obj[key] = this[key]
      return null
    })

    if (this[Op.or]) {
      obj[Op.or] = this[Op.or]
    }

    delete obj.queryObject
    delete obj.options
    if (!Object.keys(obj).length && !obj[Op.or]) { return null }
    return obj
  }
}

module.exports = Filter
