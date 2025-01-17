const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello world'
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3002, () => {
  console.log('koa app run http://localhost:3002')
})
