import Router from 'koa-router'

// import { General } from '../utils'

export const files = Router()

/** 
 * @api {get} /api/files/ Get a user avatar
 * @apiGroup Files
 * @apiSuccess (200) {object[]} void Array contains all files
 */
// files.get('/avatar/:id', async (ctx) => {
//   try {
//     General.restore('avatar', ctx.params.id)
//   } catch (err) {
//     General.logError(ctx, err)
//   }
// })

/** 
 * @api {put} /api/files/ Create a file
 * @apiGroup Files
 * @apiParam {string} content Content of the file
 * @apiParam {integer} user_id The creator's user ID
 * @apiSuccess (201) {object} void The created file
 */
// files.put('/', async (ctx) => {
//   try {

//     ctx.body = General.prettyJSON(data)
//     ctx.status = 201
//   } catch (err) {
//     General.logError(ctx, err)
//   }
// })

/** 
 * @api {post} /api/files/ Update a file
 * @apiGroup Files
 * @apiParam {string} content Content of the file
 * @apiSuccess (200) {object} void The Updated file
 */
// files.post('/:id', async (ctx) => {
//   try {

//     ctx.status = 200
//     ctx.body = General.prettyJSON(data)
//   } catch (err) {
//     General.logError(ctx, err)
//   }
// })

/** 
 * @api {delete} /api/files/:id Delete a file
 * @apiGroup Files
 * @apiSuccess (200) {void} void void
 */
// files.delete('/:id', async (ctx) => {
//   try {
//     ctx.status = 200
//   } catch (err) {
//     General.logError(ctx, err)
//   }
// })