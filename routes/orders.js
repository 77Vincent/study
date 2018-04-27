import Router from 'koa-router'

import { Order } from '../models'
import { General } from '../utils'
import c from '../config.js'

export const orders = Router()

const params = [
  'payment_method',
  'total_price',
  'unit_price',
  'length',
  'buyer_id',
  'seller_id'
]

/** 
 * @api {get} /api/orders/ Get all orders
 * @apiGroup Orders
 * @apiParam (Query String) {integer} [buyer_id] Filtered by the buyer's user ID 
 * @apiParam (Query String) {integer} [seller_id] Filtered by the seller's user ID 
 * @apiParam (Query String) {string=DESC, ASC} [updated_at=DESC] Sorting by updated time
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all orders
 */
orders.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)
    let filter = General.objToObjGroupsInArr(qs, ['buyer_id', 'seller_id'])

    let sorting = [['updated_at', 'DESC']]
    for (let key in qs) {
      // ASC as default order
      if (['updated_at'].indexOf(key) !== -1) {
        qs[key] = qs[key] === 'DESC' ? 'DESC' : 'ASC'
        sorting.splice(0, 0, [key, qs[key]])
      }
    }

    const data = await Order.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      order: sorting,
      where: { $and: filter },
    })

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/orders/ Create a order
 * @apiGroup Orders
 * @apiParam {integer} payment_method ID of the payment method
 * @apiParam {number} total_price Total price of all the classes from this order
 * @apiParam {number} unit_price Unit price of the each class from this order
 * @apiParam {number} length Length of the schedule a user has bought from this order in hours
 * @apiParam {integer} buyer_id The buyer's user ID
 * @apiParam {integer} seller_id The seller's user ID
 * @apiSuccess (201) {object} void The created order
 */
orders.put('/', async (ctx) => {
  try {
    const data = await Order.create(General.batchExtractObj(ctx.request.body, params))

    ctx.body = General.prettyJSON(data)
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {post} /api/orders/ Update a order
 * @apiGroup Orders
 * @apiParam {integer} payment_method ID of the payment method
 * @apiParam {number} total_price Total price of all the classes from this order
 * @apiParam {number} unit_price Unit price of the each class from this order
 * @apiParam {number} length Length of the schedule a user has bought from this order in hours
 * @apiParam {integer} buyer_id The buyer's user ID
 * @apiParam {integer} seller_id The seller's user ID
 * @apiSuccess (200) {object} void The Updated order
 */
orders.post('/:id', async (ctx) => {
  try {
    let data = await Order.findOne({ where: { id: ctx.params.id } })
    data = await data.update(General.batchExtractObj(ctx.request.body, params))

    General.simpleSend(ctx, data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {delete} /api/orders/:id Delete a order
 * @apiGroup Orders
 * @apiSuccess (200) {void} void void
 */
orders.delete('/:id', async (ctx) => {
  try {
    await Order.destroy({ 
      where: { id: ctx.params.id }
    })
    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})