const Sequelize = require('sequelize')

const { Op } = Sequelize

const is = input => Object.prototype.toString.call(input)

/**
 * This is a Class used for quick filtering and searching in sequelize
 * @class Filter
 * @param {Object} sourceObject The source input of filtering or searching, key is label, value is content
 * @return {Object} Plain object that can be directly used for sequelize query
 */
class Filter {
  constructor(sourceObject = {}) {
    this.sourceObject = {}
    // Clone and assign but not just assign
    // Otherwise the input sourceObject will be modified later
    Object.assign(this.sourceObject, sourceObject)
  }

  alias(aliasList = {}) {
    if (is(aliasList) !== '[object Object]') {
      throw new Error('Input of alias should be an object')
    }
    Object.keys(aliasList).map((key) => {
      const alias = aliasList[key]
      // Remove the origin property
      if (Object.prototype.hasOwnProperty.call(this.sourceObject, key)) {
        delete this.sourceObject[key]
      }
      // Add a new property using alias and give it origin value
      if (Object.prototype.hasOwnProperty.call(this.sourceObject, alias)) {
        this.sourceObject[key] = this.sourceObject[alias]
        delete this.sourceObject[alias]
      }
      return null
    })
    return this
  }

  filterBy(keys = []) {
    const source = this.sourceObject
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
    const { search } = this.sourceObject

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

    delete obj.sourceObject
    if (!Object.keys(obj).length && !obj[Op.or]) { return null }
    return obj
  }
}

module.exports = Filter
