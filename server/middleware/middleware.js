
class Middleware {

  async publicMiddleware(ctx, next) {
    let executionResult = null;
    try {
      const { body } = ctx.request;
      body.modifiedms = new Date().getTime();

      const executionResult = await next();

      ctx.body = {
        success: true,
        data: executionResult,
      };
    } catch (err) {

      console.log('api error', err)
      ctx.body = {
        success: false,
        message: err.message || err,
        code: err.text || '',
      };
    }
  }

}

module.exports = new Middleware();
