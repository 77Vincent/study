const General = require('./general')

module.exports = {
  basePOST: async (Model, ctx, callback) => {
    try {
      const data = await Model.findOne({ where: { id: ctx.params.id } })

      // Nothing found to update, return 404
      if (!data) { return }

      // Only the owner or admin user can update
      if (data.dataValues.user_id === ctx.state.currentUserID
        || data.dataValues.teacher_id === ctx.state.currentUserID
        || ctx.state.isAdmin
      ) {
        await callback(data)
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

      if (data.dataValues.user_id === ctx.state.currentUserID
        || data.dataValues.teacher_id === ctx.state.currentUserID
        || ctx.state.isAdmin
      ) {
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