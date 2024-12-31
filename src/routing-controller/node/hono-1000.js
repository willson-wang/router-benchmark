require('reflect-metadata')
const { Hono } = require('hono')
const { serve } = require('@hono/node-server')

const { createServer } = require('routing-controllers');
const path = require('path')
const { HonoDriver } = require('../dirvers/hono')

const app = new Hono()

const driver = new HonoDriver(app);

createServer(driver, {
  controllers: [path.join(__dirname, '../controllers-1000/*')]
});

serve({
  fetch: app.fetch,
  port: 3002, // Port number, default is 3000
}, (info) => {
  console.log(`hono routing 100 Listening on http://localhost:${info.port}`)
})
