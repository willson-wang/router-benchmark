const { $ } = require('zx')
const path = require('path')

const file = path.join(__dirname, './node/koa.js')

const sleep = (s = 1) => new Promise((resolve) => setTimeout(resolve, s * 1000))
;(async() => {
  // const serve = $({ verbose: true})`node ${file}`

  // sleep(2)

  // const res = await $`curl http://localhost:3002`
  // console.log(res.toString())

  // setTimeout(() => {
  //   // serve.kill('SIGINT')
  //   serve.kill()
  // }, 1000)
  // await serve.kill('SIGTERM')

  const server = $({verbose: true})`NODE_ENV=production ENV=production node ${file}`
  .nothrow();
  await sleep(2)
  console.log(111)
  await server.kill()
})()
