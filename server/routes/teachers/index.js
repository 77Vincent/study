import Router from 'koa-router';
import { Student, Student_Major,Teacher, Teacher_Major, Student_Teacher_Major,Major} from '../../models';
const router = Router();

router.get('/info',async (ctx, next) => {
  try{
    let data  = 'test';
    // await Teacher.create({account:'vincent1', name:'vincent1',password:'123456'})
    // await Teacher.create({account:'vincent2', name:'vincent2',password:'123456'})
    // await Teacher.create({account:'vincent3', name:'vincent3',password:'123456'})
    // await Teacher.create({account:'vincent4', name:'vincent4',password:'123456'})
    // await Teacher.create({account:'vincent5', name:'vincent5',password:'123456'})
    // await Teacher.create({account:'vincent6', name:'vincent6',password:'123456'})
    // await Teacher.create({account:'vincent7', name:'vincent7',password:'123456'})
    // await Teacher.create({account:'vincent8', name:'vincent8',password:'123456'})
    // await Teacher_Major.create({major_id:1,teacher_id:3})
    // await Teacher_Major.create({major_id:1,teacher_id:4})
    // await Teacher_Major.create({major_id:1,teacher_id:2})
    // await Teacher_Major.create({major_id:1,teacher_id:1})
    // await Teacher_Major.create({major_id:2,teacher_id:2})
    // await Teacher_Major.create({major_id:2,teacher_id:2})
    // await Teacher_Major.create({major_id:3,teacher_id:4})
    // await Teacher_Major.create({major_id:3,teacher_id:2})
    // await Teacher_Major.create({major_id:4,teacher_id:6})
    // await Teacher_Major.create({major_id:3,teacher_id:8})
    // await Student_Teacher_Major.create({student_id:1, teacher_major_id:1})
    // await Student_Teacher_Major.create({student_id:2, teacher_major_id:1})
    // await Student_Teacher_Major.create({student_id:3, teacher_major_id:1})
    // await Student_Teacher_Major.create({student_id:3, teacher_major_id:2})
    // await Student_Teacher_Major.create({student_id:4, teacher_major_id:4})
    // await Student_Teacher_Major.create({student_id:4, teacher_major_id:6})
    // await Student_Teacher_Major.create({student_id:2, teacher_major_id:5})
    // await Student_Teacher_Major.create({student_id:3, teacher_major_id:3})
    // await Student_Teacher_Major.create({student_id:4, teacher_major_id:3})
    // await Student_Teacher_Major.create({student_id:6, teacher_major_id:2})
    // await Student_Teacher_Major.create({student_id:1, teacher_major_id:4})
    // await Student_Teacher_Major.create({student_id:3, teacher_major_id:6})
    // await Student.create({account:'edguan1', name:'edguan1',password:'123456'})
    // await Student.create({account:'edguan2', name:'edguan2',password:'123456'})
    // await Student.create({account:'edguan3', name:'edguan3',password:'123456'})
    // await Student.create({account:'edguan4', name:'edguan4',password:'123456'})
    // await Student.create({account:'edguan5', name:'edguan5',password:'123456'})
    // await Student.create({account:'edguan6', name:'edguan6',password:'123456'})
    // await Student.create({account:'edguan7', name:'edguan7',password:'123456'})
    // await Student.create({account:'edguan8', name:'edguan8',password:'123456'})
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
    // data = await Student_Major.findAll({
    //   where:{student_id:7},
    //   include: [
    //     {
    //         model: Major,
    //         as: 'major'
    //     },
    //     {
    //       model: Student,
    //       as: 'student'
    //     }
    // ]
    // })
    data = await Student_Teacher_Major.findAll({
      where:{student_id:4},
      include:[
        {
          model:Teacher_Major,
          as:'teacher_major',
          include:[
            {
              model: Major,
              as: 'major'
            }
          ]
        },
        {
          model:Student,
          as:'student'
        }
      ]
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