const Sequelize = require('sequelize')

const R = require('ramda')
const { Op } = Sequelize

class Filter {
  constructor(sourceObject = {}) {
    this.sourceObject = sourceObject
  }

  getQuery(sourceObject) {
    return new Filter(sourceObject) 
  }

  filterBy(...keys) {
    R.forEachObjIndexed((value, key) => {
      if (R.contains(key, ...keys)) {
        let query = decodeURI(value)
        // Do not filter with empty string
        if (query !== '') {
          this[key] = query.split(',')
        }
      }
    }, this.sourceObject)
    return this
  }

  searchBy(...keys) {
    const arr = [];
    [...keys].map((value) => {
      arr.push({ [value]: { [Op.like]: `%${decodeURI(this.sourceObject.search)}%` } })
    })
    this[Op.or] = arr 
    return this
  }

  done() {
    // Return plain object for sequelize
    let obj = {}
    R.forEachObjIndexed((value, key) => {
      obj[key] = value
    }, this)
    obj[Op.or] = this[Op.or]
    delete obj.sourceObject
    return obj
  }
}

module.exports = Filter