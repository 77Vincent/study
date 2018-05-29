const General = require('../services/general')

module.exports = {
  postBase: async (Model, ctx) => {
    try {
      let data = await Model.findOne({ where: { id: ctx.params.id } })
      if (!data) { return }

      if (data.dataValues.user_id === ctx.state.currentUserID || ctx.state.currentUserID === 0) {
        data = await data.update(ctx.request.body)
        ctx.status = 200
        ctx.body = General.prettyJSON(data)
      } else {
        ctx.status = 403
      }
    } catch (err) {
      General.logError(ctx, err)
    }
  }
}