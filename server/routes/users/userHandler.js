import {
  Student,
  Teacher
} from '../../models';

let getAllUserInfos = async (ctx) => {
  let userInfo = await User.findAndCount({
    where: {}
  })
  return userInfo
}

let register = async (ctx) => {
  try {
    let {
      userInfo
    } = ctx.request.body
    await User.create(userInfo)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

let checkPassword = async (ctx) => {
  let {
    body
  } = ctx.request
  const student = await Student.findOne({
    where: {
        $or: [{ 
          account: body.name
        }, {
          email: body.name
        }],
      password: body.password
    }
  })
  const teacher = await Teacher.findOne({
    where: {
        $or: [{
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
export {
  getAllUserInfos,
  register,
  checkPassword
}