import { Student, Teacher } from '../../models'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

const authenticate = async (ctx) => {
  const { username, password } = ctx.request.body

  const student = await Student.findOne({
    where: {
      [Op.or]: [{
        account: username
      }, {
        email: username
      }],
      password: password
    }
  })

  const teacher = await Teacher.findOne({
    where: {
      [Op.or]: [{
        account: username
      }, {
        email: username
      }],
      password: password
    }
  })

  if (student && !teacher) {
    return {
      data: student,
      role: 'student'
    }
  } else if (!student && teacher) {
    return {
      data: teacher,
      role: 'teacher'
    }
  } else if (!student && !teacher) {
    // Authetication failed
    return false
  } else {
    // 老师很学生账号密码相同的情况
  }
}

const getUser = async(id, role) => {
  let user 

  if(role) {
    user = await Student.findOne({ where: { id } })
  } else {
    user = await Teacher.findOne({ where : { id } })
  }
  return  {
    data: user,
    role: role
  } 
}

export {
  authenticate,
  getUser 
}