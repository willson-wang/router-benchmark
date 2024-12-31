const { Elysia } = require('elysia')
const { randomString } = require('./utils')

const app = new Elysia();



for (let i = 0; i < 999; i++) {
  if (i === 500) {
    app.get('/hello', () => 'Hello world');
  }
  const route = `/${randomString(12)}/${(i + 1)}`;


  app.get(route, () => 'Hello test');
}

app.listen(3002, ({ hostname, port }) => {
  console.log(
    `🦊 Elysia 1000 is running at ${hostname}:${port}`
  )
})
