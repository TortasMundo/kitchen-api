const HttpServer = require('setup/server/http')
const SocketServer = require('setup/server/socket')
const orderWebEndpoints = require('src/api/http_endpoints/order_endpoints')
const orderPlacementChannel = require('src/api/socket_channels/order_placement')

const httpServer = new HttpServer([
  ...orderWebEndpoints
])

const socketServer = new SocketServer(httpServer.server, [
  ...orderPlacementChannel
])

httpServer.start(socketServer)
