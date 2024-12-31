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

new Elysia({ adapter: node() })
    .get('/', () => 'Hello world')
    .listen(3002, ({ hostname, port }) => {
        console.log(
            `🦊 Elysia is running at ${hostname}:${port}`
        )
    })
