const Koa = require('koa');
const Router = require('@koa/router');
const { randomString } = require('./utils')


const app = new Koa();
const router = new Router();



for (let i = 0; i < 99; i++) {
  if (i === 50) {
    router.get('/hello', (ctx, next) => {
      ctx.body = 'Hello world'
    });
  }
  router.get(`/${randomString(12)}/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3002, () => {
  console.log('koa app 100 run http://localhost:3002')
})
