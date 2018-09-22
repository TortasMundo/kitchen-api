const HttpServer = require('setup/server/http')
const SocketServer = require('setup/server/socket')
const orderWebEndpoints = require('src/api/http_endpoints/order_endpoints')
const orderPlacementChannel = require('src/api/socket_channels/order_placement')
const OrderingSocketClient = require('setup/client/socket/ordering_socket_client')

const httpServer = new HttpServer([
  ...orderWebEndpoints
])

const socketServer = new SocketServer(httpServer.server, [
  ...orderPlacementChannel
])

new OrderingSocketClient(socketServer).start()

httpServer.start(socketServer)
