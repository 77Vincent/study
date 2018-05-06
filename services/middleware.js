const sessionsService = require('../routes/sessions/service')

module.exports = {
  auth: async (ctx, next) => {
    try {
      const user_info = ctx.decoded.user_info
      const { id, password } = ctx.request.body
      let data = await sessionsService.auth(id, password, user_info)    

      if (data) {
        await next()
      } else {
        ctx.status = 401
        ctx.body = 'Protected resource, use Authorization header to get access\n'
      }
    } catch (err) {
      throw err
    }
  }
}