require('reflect-metadata')
const { Hono } = require('hono')

const { createServer } = require('routing-controllers');
const path = require('path')
const { HonoDriver } = require('../dirvers/hono')

const app = new Hono()

const driver = new HonoDriver(app);

createServer(driver, {
  controllers: [path.join(__dirname, '../controllers-1000/*')]
});

module.exports = {
  port: 3002,
  fetch: app.fetch,
}

