import Router from 'koa-router';
import { Teacher, Major,Student, Student_Major } from '../../models'
const router = Router();

router.get('/info',async (ctx, next) => {
  try{
    // await Major.create({name:"数学",desc:'这是数学'})
    // await Major.create({name:"英语",desc:'这是英语'})
    // await Major.create({name:"物理",desc:'这是物理'})
    // await Major.create({name:"化学",desc:'这是化学'})
    // let studentData = await Student.create({account:'sandy',password:'123456'})
    // console.log('data', studentData.id)
    // await Student_Major.create({
    //   major_id:2,
    //   student_id:7
    // })
    // await Student_Major.create({
    //   major_id:1,
    //   student_id:7
    // })
    // await Student_Major.create({
    //   major_id:3,
    //   student_id:7
    // })
    let data = await Student_Major.findAll({
      'include':[Student]
    })
    ctx.status = 200
    ctx.body = {
      userInfo: data,
      message: 'get info success'
    }
  }catch(err){
    console.log('inner err',err)
  }
})

export default router