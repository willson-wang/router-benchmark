
require('reflect-metadata')
const { createServer } = require('routing-controllers');
const path = require('path')

const { Elysia } = require('elysia')

const { ElysiaDriver } = require('../dirvers/elysia')

const app = new Elysia();

const driver = new ElysiaDriver(app);

createServer(driver, {
  controllers: [path.join(__dirname, '../controllers-100/*')]
});


app.listen(3002, ({ hostname, port }) => {
  console.log(
    `🦊 Elysia routing 100 is running at ${hostname}:${port}`
  )
})
