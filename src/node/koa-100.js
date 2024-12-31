const Koa = require('koa');
const Router = require('@koa/router');
const { randomString } = require('./utils')


const app = new Koa();
const router = new Router();



for (let i = 0; i < 20; i++) {
  // router.get(`/${randomString(12)}/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
  router.post(`/email/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
}
for (let i = 0; i < 20; i++) {
  // router.get(`/${randomString(12)}/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
  router.get(`/login/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
}
router.get('/hello', (ctx, next) => {
  ctx.body = 'Hello world'
});
for (let i = 0; i < 20; i++) {
  // router.get(`/${randomString(12)}/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
  router.get(`/product/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
}
for (let i = 0; i < 20; i++) {
  // router.get(`/${randomString(12)}/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
  router.post(`/test/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
}
for (let i = 0; i < 20; i++) {
  // router.get(`/${randomString(12)}/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
  router.get(`/user/${(i + 1)}`, async (ctx) => ctx.body = 'hello test');
}

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3002, () => {
  console.log('koa app 100 run http://localhost:3002')
})
