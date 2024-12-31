require('reflect-metadata')
const { createKoaServer } = require('routing-controllers');
const path = require('path')

// creates express app, registers all controller routes and returns you express app instance
const app = createKoaServer({
  controllers: [path.join(__dirname, '../controllers-1000/*')], // we specify controllers we want to use
});

// run express application on port 3000
app.listen(3002, () => {
    console.log('app routing run http://localhost:3002')
});

