const Router = require('koa-router')
const Sequelize = require('sequelize')
const queryString = require('query-string')

const { Order } = require('../models')
const { General, Auth } = require('../services')
const c = require('../config.js')

const { Op } = Sequelize
const orders = Router()
const { protect } = Auth

/**
 * @api {get} /api/orders/ Get all orders
 * @apiGroup Orders
 * @apiParam (Query String) {Integer} [requestor_id] Filtered by the buyer's user ID
 * @apiParam (Query String) {Integer} [recipient_id] Filtered by the seller's user ID
 * @apiParam (Query String) {Boolean} [isExpired] Filtered by if the order has been expired
 * @apiParam (Query String) {Boolean} [isPaid] Filtered by if the order has been paid
 * @apiParam (Query String) {Boolean} [isReceived] Filtered by if the order has been received
 * @apiParam (Query String) {Boolean} [isRefunded] Filtered by if the order has been refunded
 * @apiParam (Query String) {Integer} [page=1] Pagination
 * @apiSuccess (200) {object[]} void Array contains all orders
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
orders.get('/', protect, async (ctx) => {
  try {
    const query = queryString.parse(ctx.request.querystring)
    const data = await Order.findAll({
      limit: c.queryLimit,
      offset: General.getOffset(query.page, c.queryLimit),
      order: [['updated_at', 'DESC']],
      where: {
        [Op.and]: General.getFilter(query, [
          'requestor_id', 'recipient_id', 'isPaid', 'isReceived', 'isRefunded',
        ]),
      },
    })

    ctx.status = 200
    ctx.body = data
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {put} /api/orders/ Create a order
 * @apiGroup Orders
 * @apiParam {Integer} payment_method ID of the payment method
 * @apiParam {Number} total_price Total price of all the classes = require(this order
 * @apiParam {Number} unit_price Unit price of the each class = require(this order
 * @apiParam {Number} length Length of the schedule a user has bought = require(this order in hours
 * @apiParam {Integer} recipient_id The seller's user ID
 * @apiSuccess (201) {Object} void The created order
 * @apiError {String} 401 Not authenticated, sign in first to get token
 */
orders.put('/', protect, async (ctx) => {
  try {
    const {
      recipient_id, length, unit_price, total_price, payment_method,
    } = ctx.request.body
    const requestor_id = ctx.state.currentUserID
    const data = await Order.create({
      requestor_id, recipient_id, length, unit_price, total_price, payment_method,
    })

    ctx.body = data
    ctx.status = 201
  } catch (err) {
    General.logError(ctx, err)
  }
})

/**
 * @api {post} /api/orders/ Update a order
 * @apiGroup Orders
 * @apiParam {Integer} payment_method ID of the payment method
 * @apiParam {Number} total_price Total price of all the classes = require(this order
 * @apiParam {Number} unit_price Unit price of the each class = require(this order
 * @apiParam {Number} length Length of the schedule a user has bought = require(this order in hours
 * @apiParam {Boolean} isExpired If the order has been expired
 * @apiParam {Boolean} isPaid If the order has been paid
 * @apiParam {Boolean} isReceived If the order has been received
 * @apiParam {Boolean} isRefunded If the order has been refunded
 * @apiParam {Date} expired_at When will the order be expired
 * @apiParam {Date} paid_at When is order paid
 * @apiParam {Date} received_at When is the order received
 * @apiParam {Date} refuned_at When is the order refunded
 * @apiSuccess (200) {Object} void The Updated order
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
orders.post('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Order, async (current) => {
    const data = await current.update(ctx.request.body)

    ctx.status = 200
    ctx.body = data
  })
})

/**
 * @api {delete} /api/orders/:id Delete a order
 * @apiGroup Orders
 * @apiSuccess (200) {Void} void void
 * @apiError {String} 401 Not authenticated, sign in first to get token
 * @apiError {String} 403 Not authorized, no access for the operation
 * @apiError {String} 404 The requested content is found
 */
orders.delete('/:id', protect, async (ctx) => {
  await Auth.isAuthorized(ctx, Order, async (data) => {
    await Order.destroy({ where: { id: data.dataValues.id } })
    ctx.status = 200
  })
})

module.exports = { orders }
