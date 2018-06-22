const Sequelize = require('sequelize')
const querystring = require('querystring')

const { Op } = Sequelize

const is = input => Object.prototype.toString.call(input)

/**
 * This is a Class used for quick filtering and searching in sequelize
 * @class SequelizeWhere
 * @param {String} rawQuerystring The raw querystring from client
 * @param {Object} configs Configurations
 * @returns {Object} Plain object that can be directly used for sequelize query
 */
const SequelizeWhere = (rawQuerystring = '', configs = {}) => {
  if (is(rawQuerystring) !== '[object String]') {
    throw new Error('The first argument: the input querystring should be type of String')
  }
  if (is(configs) !== '[object Object]') {
    throw new Error('The second argument: options should be type of Object')
  }

  const result = {}
  const { presearch } = configs
  let {
    prefilter, alias, filterBy, searchBy,
  } = configs

  prefilter = prefilter || {}
  alias = alias || []
  filterBy = filterBy || []
  searchBy = searchBy || []

  const readyQuerystring = `${rawQuerystring}&${querystring.stringify(prefilter)}`

  const queryObject = querystring.parse(readyQuerystring)

  // Add pre-search
  if (presearch) {
    queryObject.search = presearch
  }

  // Process alias
  Object.keys(alias).map((key) => {
    const newKey = alias[key]
    // Remove the origin property
    if (Object.prototype.hasOwnProperty.call(queryObject, key)) {
      delete queryObject[key]
    }
    // Add a new property using alias and give it origin value
    if (Object.prototype.hasOwnProperty.call(queryObject, newKey)) {
      queryObject[key] = queryObject[newKey]
      delete queryObject[newKey]
    }
    return null
  })


  // Filter by
  Object.keys(prefilter).map((key) => {
    filterBy.push(key)
    return null
  })

  Object.keys(queryObject).map((key) => {
    if (filterBy.indexOf(key) !== -1) {
      const queryValue = queryObject[key]
      if (queryValue !== undefined && queryValue !== null && queryValue !== '') {
        switch (is(queryValue)) {
          case '[object Array]':
            result[key] = decodeURI(queryValue).split(',')
            break
          default:
            result[key] = decodeURI(queryValue)
        }
      }
    }
    return null
  })


  // Search by
  const { search } = queryObject

  if (searchBy.length && search) {
    const arrayForSearch = searchBy.map(value => ({
      [value]: {
        [Op.like]: `%${decodeURI(search)}%`,
      },
    }))
    result[Op.or] = arrayForSearch
  }

  if (!Object.keys(result).length && !result[Op.or]) { return null }
  return result
}

module.exports = SequelizeWhere
