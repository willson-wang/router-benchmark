const { Hono } = require('hono')

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello world')
})

module.exports = {
  port: 3002,
  fetch: app.fetch,
}
