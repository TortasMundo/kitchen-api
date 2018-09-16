const HttpServer = require('setup/server/http')
const SocketServer = require('setup/server/socket')

const httpServer = new HttpServer([

])

const socketServer = new SocketServer(httpServer.server, [])

httpServer.start(socketServer)
