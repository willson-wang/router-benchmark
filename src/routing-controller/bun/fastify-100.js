require('reflect-metadata')
const { createServer } = require('routing-controllers');
const path = require('path')
const { FastifyDriver } = require('../dirvers/fastify')

const fastify = require('fastify')({
    logger: false
})

const driver = new FastifyDriver(fastify);

createServer(driver, {
  controllers: [path.join(__dirname, '../controllers-100/*')]
});


// 启动服务！
fastify.listen({ port: 3002 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log('fastify routing app 100 run http://localhost:3002')
    // 服务器监听地址：${address}
})
