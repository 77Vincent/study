const Sequelize = require('sequelize')
const querystring = require('querystring')

const { Op } = Sequelize

const is = input => Object.prototype.toString.call(input)
const processAlias = (alias, inputQueryObject) => {
  const outputQueryObject = Object.assign({}, inputQueryObject)
  Object.keys(alias).map((key) => {
    const newKey = alias[key]
    // Remove the origin property
    if (Object.prototype.hasOwnProperty.call(outputQueryObject, key)) {
      delete outputQueryObject[key]
    }
    // Add a new property using alias and give it origin value
    if (Object.prototype.hasOwnProperty.call(outputQueryObject, newKey)) {
      outputQueryObject[key] = outputQueryObject[newKey]
      delete outputQueryObject[newKey]
    }
    return null
  })
  return outputQueryObject
}

module.exports.sequelizeQuery = {
  where(rawQuerystring = '', configs = {}) {
    if (is(rawQuerystring) !== '[object String]') {
      throw new Error('The first argument: the input querystring should be type of String')
    }
    if (is(configs) !== '[object Object]') {
      throw new Error('The second argument: options should be type of Object')
    }

    const final = {}
    let {
      prefilter, alias, filterBy, searchBy, presearch,
    } = configs

    presearch = presearch || null
    prefilter = prefilter || {}
    alias = alias || []
    filterBy = filterBy || []
    searchBy = searchBy || []

    const queryObject = processAlias(alias, querystring.parse(`${rawQuerystring}&${querystring.stringify(prefilter)}`))

    // Presearch
    if (presearch) {
      queryObject.search = presearch
    }

    // Prefilter
    Object.keys(prefilter).map((key) => {
      filterBy.push(key)
      return null
    })

    // Filter by
    Object.keys(queryObject).map((key) => {
      if (filterBy.indexOf(key) !== -1 && key !== 'search') {
        const queryValue = queryObject[key]
        if (queryValue !== undefined && queryValue !== null && queryValue !== '') {
          switch (is(queryValue)) {
            case '[object Array]':
              final[key] = decodeURI(queryValue).split(',')
              break
            default:
              final[key] = decodeURI(queryValue)
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
      final[Op.or] = arrayForSearch
    }

    if (!Object.keys(final).length && !final[Op.or]) { return null }
    return final
  },

  order(rawQuerystring = '', configs = {}) {
    const final = []
    let { orderBy, alias, preorder } = configs

    orderBy = orderBy || []
    alias = alias || []
    preorder = preorder || {}

    const queryObject = processAlias(alias, querystring.parse(`${rawQuerystring}&${querystring.stringify(preorder)}`))

    Object.keys(queryObject).map((key) => {
      if (orderBy.indexOf(key) !== -1) {
        const queryValue = queryObject[key]
        if (queryValue !== undefined && queryValue !== null && queryValue !== '') {
          final.push([key, decodeURI(queryValue)])
        }
      }
      return null
    })
    return final
  },
}
