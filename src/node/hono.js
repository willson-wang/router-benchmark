const { Hono } = require('hono')
const { serve } = require('@hono/node-server')


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello world')
})

serve({
  fetch: app.fetch,
  port: 3002, // Port number, default is 3000
}, (info) => {
  console.log(`hono Listening on http://localhost:${info.port}`)
})
