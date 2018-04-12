import Sequelize from 'sequelize'
import { User, Major } from '../models'

const Op = Sequelize.Op

export default {
  prettyJSON(json) {
    return JSON.stringify(json, null, 2)
  },
  /**
   * Parse url querystring and return requesting querystring values
   * @param {string} querystring - format: &key=value&key=value1,value2 
   * @returns {object} each key-value pair is according to the querystring
   */
  parseQuerystring(querystring) {
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
  /**
   * Count offset for db query pagination
   * @param {number} page - page number, start from 1
   * @param {number} limit - items to display per page 
   * @returns 
   */
  getOffset(page, limit) {
    return page ? ( page - 1 ) * limit : 0
  },
  /**
   * 
   * @param {object} object - source normal object that needs to be converted
   * @param {array} keys - array of values that the object's keys to be included
   * @returns {array} array contains objects in this format: [{key: value}, {key: value}]
   */
  objToObjGroupsInArr(object = {}, keys = []) {
    let arr = []
    for (let key in object) {
      arr.push({[key]: object[key].split(',')})
    }
    return arr.filter(item => keys.indexOf(Object.keys(item)[0]) !== -1)
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