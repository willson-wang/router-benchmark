const autocannon = require('autocannon')
const fs = require('fs')
const { fork, spawn } = require('child_process')
const assert = require('assert')
const path = require('path')
const Table = require('cli-table')
const { $ } = require('zx')

const routes = +(process.argv[2] || 1);
const runtime = process.argv[3] || 'node';
const isRoutingController = process.argv[4];

console.log('路由个数', routes)
console.log('运行时', runtime);
console.log('isRoutingController', isRoutingController);
// (async() => {
//   const res = await $`bun -v`;
//   console.log(res.toString())
//   // process.exit(1)
// })()

async function run(routes) {
  const url = routes === 1 ? 'http://localhost:3002' : (isRoutingController ? 'http://localhost:3002/test/hello' : 'http://localhost:3002/hello');
  console.log('压测url', url)
  const result = await autocannon({
    url,
    connections: 100, //default
    pipelining: 10, // default
    duration: 20 // default
  })
  return result
}

const time = Date.now()

const pkg = require('../package.json')

const sleep = (s = 1) => new Promise((resolve) => setTimeout(resolve, s * 1000))

async function server(item) {
  const { routes, name } = item;

  const filename = routes !== 1 ? isRoutingController ? path.join(__dirname, `./routing-controller/${runtime}/${name}-${routes}.js`) : path.join(__dirname, `./${runtime}/${name}-${routes}.js`) : path.join(__dirname, `./${runtime}/${name}.js`);

  const ls = $({verbose: true})`NODE_ENV=production ${runtime} ${filename}`.nothrow();

  await sleep()

  const result = await run(routes)

  const dir = path.join(__dirname, `../result`)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const dir1 = path.join(__dirname, `../result/${time}`)
  if (!fs.existsSync(dir1)) {
    fs.mkdirSync(dir1)
  }
  fs.writeFileSync(path.join(__dirname, `../result/${time}/${name}.json`), JSON.stringify(result))

  // assert.ok(ls.kill('SIGINT'))
  await ls.kill()

  result.server = name;
  result.version = pkg.dependencies[name];
  result.routes = routes;
  return result
}

function showTables(alls) {
  const table = new Table({
    head: ['', 'Version', 'Router number', 'Requests/s', 'Latency (ms)', 'Throughput/Mb', 'Gap(%)']
  })

  alls.sort((a, b) => parseFloat(b.requests.mean) - parseFloat(a.requests.mean));

  const topRequest = alls[0].requests.average;
  for (let item of alls) {
    const {
      requests: { average: requests },
      latency: { average: latency },
      throughput: { average: throughput }
    } = item;

    table.push([
      item.server,
      item.version,
      item.routes,
      requests ? requests.toFixed(1) : 'N/A',
      latency ? latency.toFixed(2) : 'N/A',
      throughput ? (throughput / 1024 / 1024).toFixed(2) : 'N/A',
      requests ? `-${(((topRequest - requests)/topRequest)*100).toFixed(1)}%` : 'N/A',
    ])
  }

  console.log(table.toString())
}





const libs = [
  {
    name: 'koa',
    routes,
  },
  {
    name: 'fastify',
    routes,
  },
  {
    name: 'hono',
    routes,
  },
  {
    name: 'elysia',
    routes,
  }
]

async function start() {
  let alls = []
  for(let item of libs) {
    console.log(`开始收集 ${item.name} 数据`)
    alls.push(await server(item))
    console.log(`${item.name} 数据收集完成`)
  }

  showTables(alls)
}

start()




