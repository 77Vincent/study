const Router = require('koa-router')
const querystring = require('querystring')
const fs = require('fs')
const path = require('path')
const R = require('ramda')

const { General } = require('../services')

const districts = Router()

/**
 * @api {get} /api/districts/ Get all districts
 * @apiGroup Districts
 * @apiSuccess (200) {Object[]} void Array contains all
 */
districts.get('/', async (ctx) => {
  try {
    const qs = querystring.parse(ctx.request.querystring)
    const data = JSON.parse(fs.readFileSync(path.resolve('./static/resources/locale/CN/cities.json'), 'utf8'))

    if (qs.search) {
      const result = data.filter(each => (
        R.contains(decodeURI(qs.search), each.id) ||
        R.contains(decodeURI(qs.search), each.fullname) ||
        R.contains(decodeURI(qs.search), each.pinyin.join(''))
      ))
      ctx.body = result
    } else {
      ctx.body = data
    }

    ctx.status = 200
  } catch (err) {
    General.logError(ctx, err)
  }
})

module.exports = { districts }
