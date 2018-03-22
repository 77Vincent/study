import Sequelize from 'sequelize'
import { User, Major } from '../models'

const Op = Sequelize.Op

export default {
  prettyJSON(json) {
    return JSON.stringify(json, null, 2)
  },
  parseQuerystring(querystring = [], key = '') {
    const arr = querystring.split('&')
    for (let i = 0; i < arr.length; i++) {
      const query = arr[i].split('=')
      if (query[0] === key) {
        return query[1]
      }
    }
  },
  getUser: async (id, config = {}) => {
    const param = {
      where: { [Op.or]: [ 
        { id },
        { mobilephone: id },
        { email: id }]
      },
      include: [{ model: Major, attributes: ['id'] }],
    }
    const data = await User.findOne(Object.assign(param, config))
    return data
  }
}