const Koa = require('koa')
const cors = require('@koa/cors')
const Router = require('koa-router')
const app = new Koa()
const router = Router()
const bodyParser = require('koa-bodyparser')
const config = require('config')
const port = config.port

class HttpServer {
  constructor(endpoints) {
    this.server = require('http').createServer(app.callback())
    router.get('/', async ctx => {
      ctx.body = { running: true }
    })
    endpoints.map(endpoint => {
      router[endpoint.method](endpoint.path, endpoint.action)
    })
    const whitelist = ['https://tortasmundo-orders-display.herokuapp.com', 'http://localhost:3000'];
    app.use(cors({
      origin: (ctx) => {
        const requestOrigin = ctx.accept.headers.origin;
        if (!whitelist.includes(requestOrigin)) {
          return ctx.throw(`🙈 ${requestOrigin} is not a valid origin`);
        }
        return requestOrigin;
      }
    }))
    app.use(async (ctx, next) => {
      ctx.knex = config.getKnex(ctx.request.headers['is-test'])
      return await next()
    })
    app.use(bodyParser())
  }

  start(socketServer) {
    app.use(async (ctx, next) => {
      ctx.socketServer = socketServer
      return await next()
    })
    app.use(router.routes())
    this.server.listen(port)
  }
}

module.exports = HttpServer
