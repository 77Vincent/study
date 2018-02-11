import {
  Student,
  Teacher
} from '../../models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

const getAllUserInfos = async (ctx) => {
  let userInfo = await User.findAndCount({
    where: {}
  })
  return userInfo
}

const register = async (ctx) => {
  try {
    let {
      userInfo
    } = ctx.request.body
    await Student.create(userInfo)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const checkPassword = async (ctx) => {
  let {
    body
  } = ctx.request
  const student = await Student.findOne({
    where: {
        [Op.or]: [{ 
          account: body.name
        }, {
          email: body.name
        }],
      password: body.password
    }
  })
  const teacher = await Teacher.findOne({
    where: {
      [Op.or]: [{
          account: body.name
        }, {
          email: body.name
        }],
      password: body.password
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
    // 账号或者密码错误
    return false
  } else {
    // 老师很学生账号密码相同的情况
  }
}

const getUserInfo = async(id, role) => {
  let userInfo
  if(role) {
    userInfo = await Student.findOne({
      where: { id }
    })
  } else {
    userIndo = await Teacher.findOne({ where : { id } })
  }
  return userInfo
}
export {
  getAllUserInfos,
  register,
  checkPassword,
  getUserInfo
}