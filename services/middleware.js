const sessionsService = require('../routes/sessions/service')

module.exports = {
  auth: async (ctx, next) => {
    try {
      const { id, password } = ctx.request.body
      const token = sessionsService.getToken(ctx.request.headers.authorization)

      // Authenticate credentials
      let data = await sessionsService.auth(id, password, token)    

      if (data) {
        await next()
      } else {
        ctx.status = 401
        ctx.body = 'Protected resource, use Authorization header to get access\n'
      }
    } catch (err) {
      // When token is given but invalid
      if (err.message === 'invalid signature') {
        ctx.status = 403
        ctx.body = err.message
      } else {
        throw err
      }
    }
  }
}