const { Hono } = require('hono')
const { serve } = require('@hono/node-server')
const { createMiddleware } = require('hono/factory')

const { every } = require('hono/combine')

const app = new Hono()

// app.get('/', (c) => {
//   return c.text('Hello world')
// })
// app.use(async (_, next) => {
//   console.log('middleware 1 start')
//   await next()
//   console.log('middleware 1 end')
// })
// app.use(async (_, next) => {
//   console.log('middleware 2 start')
//   await next()
//   console.log('middleware 2 end')
// })

// app.use(createMiddleware(async (_, next) => {
//   console.log('middleware 3 start')
//   await next()
//   console.log('middleware 3 end')
// }))

// koa 的中间件是这样的
// - 全局中间件
// - 路由中间件
  // - 前置中间件、handle、后置中间件

// routing-controller两种返回方式
  // return 内容
  // ctx.body = 'xxx' return ctx
// app.get('/', every(async (c, next) => {
//   console.log('middleware inner 1 start')
//   await next()
//   console.log('middleware inner 1 end')
// }, async(c, next) => {
//   console.log('next', next)
//   // return c.body('Hello world')
//   c.body('Hello world')
//   // await next()
// }, async (c, next) => {
//   console.log('middleware inner 2 start', c.body)
//   await next()
//   console.log('middleware inner 2 end')
// }))
// app.get('/', (c, next) => {
//   console.log('next', next)
//   // return c.body('Hello world')
//   return c.body('Hello world')
// })



serve({
  fetch: app.fetch,
  port: 3002, // Port number, default is 3000
}, (info) => {
  console.log(`hono Listening on http://localhost:${info.port}`)
})
