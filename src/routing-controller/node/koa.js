// require('reflect-metadata')
// const { createKoaServer } = require('routing-controllers');
// const path = require('path')

// // creates express app, registers all controller routes and returns you express app instance
// const app = createKoaServer({
//   controllers: [path.join(__dirname, '../controllers-100/*')], // we specify controllers we want to use
// });

// // run express application on port 3000
// app.listen(3002, () => {
//     console.log('app run http://localhost:3002')
// });

// koa的中间件，就是完全通过执行next，来执行下一个，如果不执行next则，中断后面的中间件执行，最后的返回结果是当所有的中间件执行完成之后，判断ctx.body上是否有值，有就返回对应的值，没有就返回Not Found;

// 所以koa中，路由中间件中，直接return是会返回Not Found，不会返回对应的值
// router.get('/', (ctx, next) => {
//   // 只会返回Not Found
//   return 'Hello world'
// });

// router.get('/', (ctx, next) => {
//   // 会返回Hello world
//   ctx.body='Hello world'
// });


const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

app.use(async (_, next) => {
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
})
app.use(async (_, next) => {
  console.log('middleware 2 start')
  await next()
  console.log('middleware 2 end')
})



router.get('/', (ctx, next) => {
  // return 'Hello world'
  ctx.body = 'Hello world'
  next()
});

app.use(async (_, next) => {
  console.log('middleware 3 start')
  await next()
  console.log('_', _.body)
  console.log('middleware 3 end')
})

app
  .use(router.routes())
  .use(router.allowedMethods());

// 全局中间件，就是控制各个全局中间件的的执行顺序
// 控制器中间件，就是路由的前后中间件


app.listen(3002, () => {
  console.log('koa app run http://localhost:3002')
})
