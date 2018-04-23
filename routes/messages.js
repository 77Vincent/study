import Router from 'koa-router'

import { Message } from '../models'
import { General } from '../utils'
import c from '../config'

export const messages = Router()

const filters = ['user_id', 'recipient_id', 'read']

/** 
 * @api {get} /api/messages Get all messages
 * @apiGroup Messages 
 * @apiParam (Query String) {integer} [user_id] Filtered by the sender's user ID 
 * @apiParam (Query String) {integer} [recipient_id] Filtered by the recipient's user ID
 * @apiParam (Query String) {boolean=0,1} [read=0,1] Filtered by if the message is read 
 * @apiParam (Query String) {string} [content] Search by message content
 * @apiSuccess (200) {object[]} void Array contains all messages 
 */
messages.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    const filter = General.objToObjGroupsInArr(qs, filters)

    // Search
    if (qs.content) {
      filter.push({
        content: { $like: `%${decodeURI(qs.content)}%` }
      })
    }

    const data = await Message.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      where: { $and: filter }
    })
    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/messages Create a new message
 * @apiGroup Messages 
 * @apiParam {string} content Message content
 * @apiParam {string} user_id The sender's user ID 
 * @apiParam {string} recipient_id The recipient's user ID
 * @apiParamExample {json} Request-example:
 *  {
 *    "content": "Hellow world",
 *    "user_id": 1,
 *    "recipient_id": 2 
 *  }
 * @apiSuccess (201) {object} void The newly created message
 */
messages.put('/', async (ctx) => {
  try {
    const { content, recipient_id, user_id } = ctx.request.body
    const data = await Message.create({ content, recipient_id, user_id })

    ctx.status = 201
    ctx.body = General.prettyJSON(data) 
  } catch (err) {
    General.logError(ctx, err)
  }
})

