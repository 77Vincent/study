const Router = require('koa-router')

const { Order } = require('../models')
const { General, Auth } = require('../services')
const c = require('../config.js')

const orders = Router()
const { protect } = Auth

/** 
 * @api {get} /api/orders/ Get all orders
 * @apiGroup Orders
 * @apiParam (Query String) {integer} [requestor_id] Filtered by the buyer's user ID 
 * @apiParam (Query String) {integer} [recipient_id] Filtered by the seller's user ID 
 * @apiParam (Query String) {boolean} [isPaid] Filtered by if the order has been paid
 * @apiParam (Query String) {boolean} [isReceived] Filtered by if the order has been received
 * @apiParam (Query String) {boolean} [isRefunded] Filtered by if the order has been refunded
 * @apiParam (Query String) {integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all orders
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 */
orders.get('/', protect, async (ctx) => {
  try {
    const qs = General.parseQuerystring(ctx.request.querystring)

    const data = await Order.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(qs.page, c.queryLimit),
      order: [['updated_at', 'DESC']],
      where: { $and: General.getFilter(qs, [
        'requestor_id', 'recipient_id', 'isPaid', 'isReceived', 'isRefunded'
      ]) },
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
 * @apiParam {integer} recipient_id The seller's user ID
 * @apiSuccess (201) {object} void The created order
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 */
orders.put('/', protect, async (ctx) => {
  try {
    const { recipient_id, length, unit_price, total_price, payment_method } = ctx.request.body
    const requestor_id = ctx.state.currentUserID
    const data = await Order.create({ requestor_id, recipient_id, length, unit_price, total_price, payment_method})

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
 * @apiParam {boolean} paid If the order has been paid
 * @apiSuccess (200) {object} void The Updated order
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
orders.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Order, async (data) => {
    data = await data.update(ctx.request.body)
    ctx.status = 200
    ctx.body = General.prettyJSON(data)
  })
})

/** 
 * @api {delete} /api/orders/:id Delete a order
 * @apiGroup Orders
 * @apiSuccess (200) {void} void void
 * @apiError {string} 401 Not authenticated, sign in first to get token 
 * @apiError {string} 403 Not authorized, no access for the operation
 * @apiError {string} 404 The requested content is found
 */
orders.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Order, async (data) => {
    await Order.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { orders }