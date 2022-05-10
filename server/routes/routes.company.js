const router = require('koa-router')();
const { publicMiddleware } = require('../middleware/middleware');
const companyService = require('../modules/company');

router
  .prefix('/api/company')
  .use(publicMiddleware)

  .get('/', async (ctx) => {
    debugger;
    //const defaults = [{id:1, name:'company1'},{id:2, name:'company2'}]
    const response = await companyService.list();
    return response;
  })
  .post('/', async (ctx) => {
    const { body } = ctx.request;
    const response = await companyService.create(body);
    return response;
  })


module.exports = router;
