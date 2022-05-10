/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const Koa = require('koa');

const koaRouter = require('koa-router')();
const send = require('koa-send');
const koaBody = require('koa-body');
// const serve = require('koa2-static-middleware');
const cors = require('koa2-cors');

global.__basedir = __dirname;

let server = null;
const app = new Koa();

app.use(cors());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024,
    },
  }),
);


koaRouter.get('/', async (ctx) => {
  ctx.body = [{id:1, name:'company1'},{id:2, name:'company2'}]
});

app.use(koaRouter.routes()).use(koaRouter.allowedMethods());

const SERVER_PORT = process.env.SERVER_PORT || 3004;

server = app.listen(SERVER_PORT).on('error', (err) => {
  console.log('error on listen server', err);
});

console.log(koaRouter.stack.map(i => i.path));

module.exports = server;
