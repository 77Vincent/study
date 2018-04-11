import Sequelize from 'sequelize'
import { User, Major } from '../models'

const Op = Sequelize.Op

export default {
  prettyJSON(json) {
    return JSON.stringify(json, null, 2)
  },
  /**
   * Parse url querystring and return requesting querystring values
   * @param {string} querystring 
   * @returns {object} containing the querystring key-value pairs
   */
  parseQuerystring(querystring) {
    if (!querystring) { return {} }
    const arr = querystring.split('&')
    let o = {}
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf('=') === -1) { break }
      const pair = arr[i].split('=')
      o[pair[0]] = pair[1]
    }
    return o
  },
  getUser: async (id, config = {}) => {
    const param = {
      where: { [Op.or]: [ 
        { id },
        { username: id },
        { mobilephone: id },
        { email: id }]
      },
      include: [{ model: Major, attributes: ['id'] }],
    }
    const data = await User.findOne(Object.assign(param, config))
    return data
  }
}