global.Promise.withResolvers = function () {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};
require('reflect-metadata')
const { createServer } = require('routing-controllers');
const path = require('path')

const { Elysia } = require('elysia')
const { node } = require('@elysiajs/node')

const { randomString } = require('./utils')
const { ElysiaDriver } = require('../dirvers/elysia')

const app = new Elysia({ adapter: node() });

const driver = new ElysiaDriver(app);

createServer(driver, {
  controllers: [path.join(__dirname, '../controllers-100/*')]
});

app.listen(3002, ({ hostname, port }) => {
  console.log(
    `🦊 Elysia routing 100 is running at ${hostname}:${port}`
  )
})
