import { Db, General } from '../utils'
import { User, Schedule, Tag, Post, Course } from '../models'

export default {
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
    const urls = ['followers', 'followings', 'students', 'teachers']
    const urlsByQuerystring = ['posts', 'courses']

    const majors = await Db.model('user_major').findAll({ where: { user_id: id } })
    const tags = await Tag.findAll({ where: { user_id: id } })

    data.majors = majors.map(major => major.major_id)
    data.tags = tags.map(tag => tag.content)

    const followers = await Db.model('follower_following').findAll({ where: { following_id: id } })
    const followings = await Db.model('follower_following').findAll({ where: { follower_id: id } })
    const students = await Db.model('student_teacher').findAll({ where: { teacher_id: id } })
    const courses = await Course.findAll({ where: { user_id: id } })
    const posts = await Post.findAll({ where: { user_id: id} })
    const students_onboard = await Schedule.findAll({ where: { teacher_id: id } })

    data.followers = followers.length
    data.followings = followings.length
    data.students = students.length
    data.posts = posts.length
    data.courses = courses.length
    data.students_onboard = students_onboard.length

    data.students_onboard_url = General.getDomain(`/api/schedules?teacher_id=${id}`)
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
  generalOrder(values) {
    const aspects = {
      bio: values.title ? 5 : 0,
      place: values.place === 'both' ? 5 : 0,
      available: values.available ? 5 : 0,
      tags: values.tags.length ? 5 : 0,
      followings: values.followings * 2,
      followers: values.followers * 5,
      students: values.students * 5,
      students_onboard: values.students_onboard * 2,
      posts: values.posts * 3,
      courses: values.courses * 2
    }

    // const u = Number(Math.log(Date.now(values.updated_at)).toFixed(5))

    let weight = 0
    for (let key in aspects) {
      if (aspects.hasOwnProperty(key)) {
        weight += aspects[key]
      }
    }

    return weight
  }
}