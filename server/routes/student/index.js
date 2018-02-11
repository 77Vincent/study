import Router from 'koa-router'
import normalizeRes from '../../untils/normalizeRes'
const router = Router()
import { getMajors, getTeachers } from './majorHandle'
// 学生获取所有的老师信息
router.get('/teachers/:id?', async(ctx, next) => {
    await normalizeRes(ctx, getTeachers)
})

// 学生获取所有的专业信息
router.get('/majors/:id?', async(ctx, next) => {
    await normalizeRes(ctx, getMajors)
})

export default router