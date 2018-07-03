const Sequelize = require('sequelize')

const { Op } = Sequelize
const General = require('../../services/general')
const seq = require('../../services/sequelize-easy-query')
const Database = require('../../services/database')
const {
  User, Tag, Post, Course, Major, School, Schedule, Country, Place,
} = require('../../models')

module.exports = {
  getOneUser: async (id, config = {}) => {
    const param = {
      where: {
        [Op.or]: [
          { id },
          { username: id },
          { mobilephone: id },
          { email: id }],
      },
      include: [
        { model: Major },
        { model: Country },
        { model: School },
        { model: Place },
      ],
    }
    const data = await User.findOne(Object.assign(param, config))
    return data
  },

  include(ctx) {
    return [{
      model: Major,
      where: seq(ctx.request.querystring, {
        filterByAlias: { id: 'major_id' },
      }),
    }, {
      model: Country,
      where: seq(ctx.request.querystring, {
        filterByAlias: { id: 'country_id' },
      }),
    }, {
      model: School,
      where: seq(ctx.request.querystring, {
        filterByAlias: { id: 'school_id' },
      }),
    }, {
      model: Place,
      where: seq(ctx.request.querystring, {
        filterByAlias: { id: 'place_id' },
      }),
    }]
  },

  processUserData: async (inputUserData = {}) => {
    const data = inputUserData
    // Do not pass these fields to client
    delete data.password
    delete data.identity_number

    const user_id = data.id

    // To teachers
    if (data.role_id === 1) {
      const students = await Schedule.findAll({
        where: {
          teacher_id: user_id,
        },
      })
      const students_onboard = await Schedule.findAll({
        where: {
          teacher_id: user_id,
          finished: 1,
        },
      })
      data.students = students.length
      data.students_onboard = students_onboard.length
      data.students_url = General.getDomain(`/api/users/${user_id}/students`)
      data.students_onboard_url = General.getDomain(`/api/users/${user_id}/students?finished=0`)
    }

    // To students
    if (data.role_id === 2) {
      data.teachers_url = General.getDomain(`/api/users/${user_id}/teachers`)
      data.teachers_onboard_url = General.getDomain(`/api/users/${user_id}/teachers?finished=0`)
    }

    // Add tags
    const tags = await Tag.findAll({ where: { user_id } })
    data.tags = tags.map(tag => ({ id: tag.id, content: tag.content }))


    // Add these properties
    const followers = await Database.model('follower_following').findAll({ where: { following_id: user_id } })
    const followings = await Database.model('follower_following').findAll({ where: { follower_id: user_id } })
    const courses = await Course.findAll({ where: { user_id } })
    const posts = await Post.findAll({ where: { user_id } })

    data.posts = posts.length
    data.posts_url = General.getDomain(`/api/posts?user_id=${user_id}`)

    data.courses = courses.length
    data.courses_url = General.getDomain(`/api/courses?user_id=${user_id}`)

    data.followings = followings.length
    data.followings_url = General.getDomain(`/api/followings?follower_id=${user_id}`)

    data.followers = followers.length
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
    Object.keys(aspects).map((key) => {
      weight += aspects[key]
      return null
    })

    return weight
  },
}
