const { Hono } = require('hono')
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

module.exports = {
  port: 3002,
  fetch: app.fetch,
}
