import { Db, General } from '../utils'
import { User, Schedule, Tag } from '../models'

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

    const followers = await Db.model('follower_following').findAll({ where: { following_id: id } })
    const followings = await Db.model('follower_following').findAll({ where: { follower_id: id } })
    const tags = await Tag.findAll({ where: { user_id: id } })
    const majors = await Db.model('user_major').findAll({ where: { user_id: id } })
    const students = await Db.model('student_teacher').findAll({ where: { teacher_id: id } })
    const students_onboard = await Schedule.findAll({ where: { teacher_id: id } })

    data.majors = majors.map(major => major.major_id)
    data.tags = tags.map(tag => tag.content)
    data.followers = followers.length
    data.followings = followings.length
    data.students = students.length
    data.students_onboard = students_onboard.length

    data.students_onboard_url = General.getDomain(`/api/schedules?teacher_id=${id}`)
    urlsByQuerystring.map(each => {
      data[`${each}_url`] = General.getDomain(`/api/${each}?user_id=${id}`)
    })
    urls.map(each => {
      data[`${each}_url`] = General.getDomain(`/api/users/${id}/${each}`)
    })
  }
}