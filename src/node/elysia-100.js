global.Promise.withResolvers = function () {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const { Elysia } = require('elysia')
const { node } = require('@elysiajs/node')
const { randomString } = require('./utils')

const app = new Elysia({ adapter: node() });



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
