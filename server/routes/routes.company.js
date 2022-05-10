const router = require('koa-router')();
const { publicMiddleware } = require('../middleware/middleware');
const companyModule = require('../modules/company');

router
  .prefix('/api/company')
  .use(publicMiddleware)

  .post('/', async (ctx) => {
    debugger;
    const { body } = ctx.request;
    const response = await companyModule.create(body);
    return response;
  })


module.exports = router;
