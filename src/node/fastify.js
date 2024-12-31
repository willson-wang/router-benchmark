const fastify = require('fastify')({
    logger: false
})

fastify.get('/', function (request, reply) {
    reply.send('hello world')
})

// 启动服务！
fastify.listen({ port: 3002 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log('fastify app run http://localhost:3002')
    // 服务器监听地址：${address}
})
