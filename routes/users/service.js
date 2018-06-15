const Sequelize = require('sequelize')

const { Op } = Sequelize
const General = require('../../services/general')
const Database = require('../../database')
const { User, Tag, Post, Course, Major, School } = require('../../models')

module.exports = {
  getOneUser: async (id, config = {}) => {
    const param = {
      where: { [Op.or]: [ 
        { id },
        { username: id },
        { mobilephone: id },
        { email: id }]
      },
      include: [{ model: Major }],
    }
    const data = await User.findOne(Object.assign(param, config))
    return data
  },
  processUserData: async (data) => {
    // First remove password, do not pass password to client
    delete data.password

    const user_id = data.id
    const urlsByQuerystring = ['posts', 'courses']

    // Add students info to teachers
    if (data.role_id === 1) {
      data.students_url = General.getDomain(`/api/users/${user_id}/students`)
      data.students_onboard_url = General.getDomain(`/api/users/${user_id}/students?finished=0`)
    } 

    // Add teachers info to students
    if (data.role_id === 2) {
      data.teachers_url = General.getDomain(`/api/users/${user_id}/teachers`)
      data.teachers_onboard_url = General.getDomain(`/api/users/${user_id}/teachers?finished=0`)
    }

    // Add school
    const school = await School.findAll({ where: { id: data.school_id } })
    data.school = school[0]
    delete data.school_id

    // Add tags
    const tags = await Tag.findAll({ where: { user_id } })
    data.tags = tags.map(tag => {
      return { id: tag.id, content: tag.content }
    })


    // Add these properties
    const followers = await Database.model('follower_following').findAll({ where: { following_id: user_id } })
    const followings = await Database.model('follower_following').findAll({ where: { follower_id: user_id } })
    const courses = await Course.findAll({ where: { user_id: user_id } })
    const posts = await Post.findAll({ where: { user_id: user_id} })
    data.followers = followers.length
    data.followings = followings.length
    data.posts = posts.length
    data.courses = courses.length

    urlsByQuerystring.map(each => {
      data[`${each}_url`] = General.getDomain(`/api/${each}?user_id=${user_id}`)
    })

    data.followings_url = General.getDomain(`/api/followings?follower_id=${user_id}`)
    data.followers_url = General.getDomain(`/api/followings?following_id=${user_id}`)
  },
  /**
   * Give each user a weight for ordering based on several aspects
   * @param {Object} values each user model
   * @returns {Number} the weight to return
   */
  defaultOrder(values) {
    const origin = '2018/4/1'
    const aspects = {
      bio: values.title ? 6 : 0,
      place: values.place === 'both' ? 6 : 0,
      tags: values.tags.length ? 6 : 0,
      available: values.available,
      followings: values.followings * 2,
      followers: values.followers * 6,
      students: values.students * 5,
      students_onboard: values.students_onboard * 3,
      posts: values.posts * 3,
      courses: values.courses * 2,
      lastSignIn: General.msToDay(Date.parse(values.last_signin) - Date.parse(origin)),
      lastUpdate: General.msToDay(Date.parse(values.updated_at) - Date.parse(origin)) * 2,
    }

    let weight = 0
    for (let key in aspects) {
      if (aspects.hasOwnProperty(key)) {
        weight += aspects[key]
      }
    }

    return weight
  }
}
