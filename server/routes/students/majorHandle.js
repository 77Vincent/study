import {
    Major,
    Teacher,
    Teacher_Major
  } from '../../models'
import Sequelize from 'sequelize'
const Op = Sequelize.Op;

// 支持分页查询
const getMajors = async (ctx) => {
  let { id } = ctx.params
  let { limit, offset } = ctx.query
  let condition  = {
    where: {},
    limit,
    offset,
    attributes: ['name', 'desc']
  }
  if(id){
    condition.where.id = id
  }
  return Major.findAll(condition)
}

// 获取所有的老师信息
const getTeachers = async(ctx) => {
  let { id } = ctx.params
  let { limit, offset } = ctx.query
  let condition  = {
    where: {},
    limit,
    offset,
    include:[
      {
        model: Major
      }
    ]
  }
  if(id){
    condition.where.id = id
  }
  let teacher = await Teacher.findAll(condition)
  return teacher
}
  

export {
  getMajors,
  getTeachers
}
