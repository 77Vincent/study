const Router = require('koa-router')

const { Order } = require('../models')
const { General } = require('../services')
const c = require('../config.js')

const orders = Router()

/** 
 * @api {get} /api/orders/ Get all orders
 * @apiGroup Orders
 * @apiParam (Query String) {integer} [buyer_id] Filtered by the buyer's user ID 
 * @apiParam (Query String) {integer} [seller_id] Filtered by the seller's user ID 
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all orders
 */
orders.get('/', async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)

    const data = await Order.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      order: [['updated_at', 'DESC']],
      where: { $and: General.getFilter(qs, ['buyer_id', 'seller_id']) },
    })

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  } catch (err) {
    General.logError(ctx, err)
  }
})

/** 
 * @api {put} /api/orders/ Create a order
 * @apiGroup Orders
 * @apiParam {integer} payment_method ID of the payment method
 * @apiParam {number} total_price Total price of all the classes = require(this order
 * @apiParam {number} unit_price Unit price of the each class = require(this order
 * @apiParam {number} length Length of the schedule a user has bought = require(this order in hours
 * @apiParam {integer} buyer_id The buyer's user ID
 * @apiParam {integer} seller_id The seller's user ID
 * @apiSuccess (201) {object} void The created order
 */
orders.put('/', async (ctx) => {
  try {
    const data = await Order.create(ctx.request.body)

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
 * @apiParam {number} total_price Total price of all the classes = require(this order
 * @apiParam {number} unit_price Unit price of the each class = require(this order
 * @apiParam {number} length Length of the schedule a user has bought = require(this order in hours
 * @apiParam {integer} buyer_id The buyer's user ID
 * @apiParam {integer} seller_id The seller's user ID
 * @apiSuccess (200) {object} void The Updated order
 */
orders.post('/:id', async (ctx) => {
  try {
    let data = await Order.findOne({ where: { id: ctx.params.id } })
    data = await data.update(ctx.request.body)

    ctx.status = 200
    ctx.body = General.prettyJSON(data)
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

module.exports = { orders }