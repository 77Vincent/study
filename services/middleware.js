const sessionsService = require('../routes/sessions/service')

module.exports = {
  protect: async (ctx, next) => {
    try {
      const { id, password } = ctx.request.body
      const token = sessionsService.getToken(ctx.request.headers.authorization)

      // Authenticate credentials
      const user = await sessionsService.auth(id, password, token)    

      // Users can only modify their own data
      // Or sign in as admin
      const isValid = user 
        && (ctx.params.id === user.dataValues.id || user.dataValues.role_id === 1)

      if (isValid) {
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