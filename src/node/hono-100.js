const { Hono } = require('hono')
const { serve } = require('@hono/node-server')
const { randomString } = require('./utils')

const app = new Hono()


for (let i = 0; i < 99; i++) {
  if (i === 50) {
    app.get('/hello', (c) => {
      return c.text('Hello world')
    })
  }
  app.get(`/${randomString(12)}/${(i + 1)}`, (c) => {
    return c.text('Hello test')
  })
}

serve({
  fetch: app.fetch,
  port: 3002, // Port number, default is 3000
}, (info) => {
  console.log(`hono 100 Listening on http://localhost:${info.port}`)
})
