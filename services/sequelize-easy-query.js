const Sequelize = require('sequelize')
const querystring = require('querystring')

const { Op } = Sequelize

const is = input => Object.prototype.toString.call(input)

const isEmpty = input => input !== undefined && input !== null && input !== ''

const paramsValidate = (object) => {
  if (is(object) !== '[object Object]') {
    throw new Error('The second parameter: options should be type of Object')
  }
}

const processAlias = (alias, inputQueryObject) => {
  const outputQueryObject = Object.assign({}, inputQueryObject)
  Object.keys(alias).map((key) => {
    const newKey = alias[key]
    if (newKey === key) {
      return null
    }
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

module.exports = {
  where(rawQuerystring = '', options = {}) {
    paramsValidate(options)

    const final = {}
    let {
      filter, filterByAlias, filterBy, searchBy, search,
    } = options

    filter = filter || {}
    filterBy = filterBy || []
    filterByAlias = filterByAlias || {}
    search = search || null
    searchBy = searchBy || []

    const queryObject = processAlias(filterByAlias, querystring
      .parse(`${rawQuerystring}&${querystring.stringify(filter)}`))

    // Presearch
    if (search) {
      queryObject.search = search
    }

    Object.keys(filter).map((key) => {
      filterBy.push(key)
      return null
    })
    Object.keys(filterByAlias).map((key) => {
      filterBy.push(key)
      return null
    })

    // Filter by
    Object.keys(queryObject).map((key) => {
      if (filterBy.indexOf(key) !== -1 && key !== 'search') {
        const queryValue = queryObject[key]
        if (isEmpty(queryValue)) {
          switch (is(queryValue)) {
            case '[object Array]':
              final[key] = decodeURI(queryValue).split(',').filter(value => isEmpty(value))
              break
            default:
              final[key] = decodeURI(queryValue)
          }
        }
      }
      return null
    })

    // Search by
    if (searchBy.length && queryObject.search) {
      const arrayForSearch = searchBy.map(value => ({
        [value]: {
          [Op.like]: `%${decodeURI(queryObject.search)}%`,
        },
      }))
      final[Op.or] = arrayForSearch
    }

    if (!Object.keys(final).length && !final[Op.or]) { return null }
    return final
  },

  order(rawQuerystring = '', options = {}) {
    paramsValidate(options)

    const final = []
    let { orderBy, orderByAlias, order } = options

    order = order || {}
    orderBy = orderBy || []
    orderByAlias = orderByAlias || {}

    const queryObject = processAlias(orderByAlias, querystring
      .parse(`${rawQuerystring}&${querystring.stringify(order)}`))

    Object.keys(order).map((key) => {
      orderBy.push(key)
      return null
    })
    Object.keys(orderByAlias).map((key) => {
      orderBy.push(key)
      return null
    })

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
