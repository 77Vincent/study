const General = require('./general')

module.exports = {
  basePOST: async (Model, ctx, isOutRange) => {
    try {
      let data = await Model.findOne({ where: { id: ctx.params.id } })

      // Nothing found to update, return 404
      if (!data) { return }

      // Some input is out of valid range
      if (isOutRange) {
        ctx.status = 416
        ctx.body = isOutRange
        return
      }

      if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.isAdmin) {
        data = await data.update(ctx.request.body)
        ctx.status = 200
        ctx.body = General.prettyJSON(data)
      } else {
        ctx.status = 403
      }
    } catch (err) {
      General.logError(ctx, err)
    }
  },
  baseDELETE: async (Model, ctx) => {
    try {
      let data = await Model.findOne({ where: { id: ctx.params.id } })
      if (!data) { return }

      if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.isAdmin) {
        await Model.destroy({ where: { id: ctx.params.id } })
        ctx.status = 200
      } else {
        ctx.status = 403
      }
    } catch (err) {
      General.logError(ctx, err)
    }
  }
}