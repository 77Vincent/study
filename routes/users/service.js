const General = require('../../utils/general')
const Database = require('../../database')
const { User, Schedule, Tag, Post, Course } = require('../../models')

module.exports = {
  getOneUser: async (id, config = {}) => {
    const param = {
      where: { $or: [ 
        { id },
        { username: id },
        { mobilephone: id },
        { email: id }]
      }
    }
    const data = await User.findOne(Object.assign(param, config))
    return data
  },
  addFields: async (data, id) => {
    const urls = ['followers', 'followings']
    const urlsByQuerystring = ['posts', 'courses']

    data.avatar_url = General.getDomain(`/api/avatars/user_id/${id}`)

    // Add students info to teachers
    if (data.role_id === 2) {
      const students = await Schedule.findAll({ 
        where: { teacher_id: id }
      })
      const students_onboard = await Schedule.findAll({ 
        where: { $and: [
          { teacher_id: id },
          { finished: 0 }
        ]}
      })
      data.students = students.length
      data.students_onboard = students_onboard.length
      data.students_url = General.getDomain(`/api/users/${id}/students`)
      data.students_onboard_url = General.getDomain(`/api/users/${id}/students?finished=0`)
    } 

    // Add teachers info to students
    if (data.role_id === 3) {
      const teachers = await Schedule.findAll({ 
        where: { student_id: id }
      })
      const teachers_onboard = await Schedule.findAll({ 
        where: { $and: [
          { student_id: id },
          { finished: 0 }
        ]}
      })

      data.teachers = teachers.length
      data.teachers_onboard = teachers_onboard.length
      data.teachers_url = General.getDomain(`/api/users/${id}/teachers`)
      data.teachers_onboard_url = General.getDomain(`/api/users/${id}/teachers?finished=0`)
    }

    // Add majors and tags
    const majors = await Database.model('user_major').findAll({ where: { user_id: id } })
    const tags = await Tag.findAll({ where: { user_id: id } })
    data.majors = majors.map(major => major.major_id)
    data.tags = tags.map(tag => tag.content)


    // Add these properties
    const followers = await Database.model('follower_following').findAll({ where: { following_id: id } })
    const followings = await Database.model('follower_following').findAll({ where: { follower_id: id } })
    const courses = await Course.findAll({ where: { user_id: id } })
    const posts = await Post.findAll({ where: { user_id: id} })
    data.followers = followers.length
    data.followings = followings.length
    data.posts = posts.length
    data.courses = courses.length

    urlsByQuerystring.map(each => {
      data[`${each}_url`] = General.getDomain(`/api/${each}?user_id=${id}`)
    })
    urls.map(each => {
      data[`${each}_url`] = General.getDomain(`/api/users/${id}/${each}`)
    })
  },
  /**
   * Give each user a weight for ordering based on several aspects
   * @param {object} values each user model
   * @returns {number} the weight to return
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
