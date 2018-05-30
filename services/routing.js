const General = require('./general')

module.exports = {
  basePOST: async (Model, ctx) => {
    try {
      let data = await Model.findOne({ where: { id: ctx.params.id } })
      if (!data) { return }

      if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.currentUserID === 1) {
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

      if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.currentUserID === 1) {
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