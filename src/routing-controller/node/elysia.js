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

const app = new Elysia({ adapter: node() });

app.get('/test/hello', (context) => {
      console.log('context', context)
      return 'Hello world'
    });

app.listen(3002, ({ hostname, port }) => {
        console.log(
            `🦊 Elysia is running at ${hostname}:${port}`
        )
    })
