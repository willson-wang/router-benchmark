const fastify = require('fastify')({
    logger: false
})

const { randomString } = require('./utils')



for (let i = 0; i < 99; i++) {
  if (i === 50) {
    fastify.get('/hello', function (request, reply) {
      reply.send('Hello world')
  })
  }
  fastify.get(`/${randomString(12)}/${(i + 1)}`, function (request, reply) {
    reply.send('hello test')
})
}

// 启动服务！
fastify.listen({ port: 3002 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log('fastify app 100 run http://localhost:3002')
    // 服务器监听地址：${address}
})
