const uuid = require('uuid')
const hn = require('./lib/hn')
let HN = new hn()

var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', async (ctx, next) => {
  console.log(`${uuid.v4()} - ${(new Date()).toISOString()} - Fetching top 10`)
  ctx.body = await HN.prepareTopTen()
});

router.get('/json', async (ctx, next) => {
  console.log(`${uuid.v4()} - ${(new Date()).toISOString()} - Fetching top 10 JSON`)
  ctx.body = await HN.prepareTopTenJson()

})

router.get('/health', async (ctx, next) => {
  await HN.prepareTopTenJson()
  ctx.body = "UP"
})

console.log("Starting server on port 8000")
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8000)