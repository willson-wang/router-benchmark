
const { Elysia } = require('elysia')
const { randomString } = require('./utils')

const app = new Elysia();



for (let i = 0; i < 99; i++) {
  if (i === 50) {
    app.get('/hello', () => 'Hello world');
  }
  const route = `/${randomString(12)}/${(i + 1)}`;


  app.get(route, () => 'Hello test');
}

app.listen(3002, ({ hostname, port }) => {
  console.log(
    `🦊 Elysia 100 is running at ${hostname}:${port}`
  )
})
