const Koa = require('koa')
const cors = require('koa-cors')
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
    app.use(cors({ origin: true }))
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
