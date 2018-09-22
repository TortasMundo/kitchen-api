const io = require('socket.io-client')
const config = require('config')
const redis = require('services/redis')

class OrderingSocketClient {
  constructor(socketServer) {
    this.socketServer = socketServer
  }

  start() {
    const socketClient = io(config.ordering_service_host)
    socketClient.on('placed_order', async data => {
      const socketIds = await redis.georadius(
        'kitchen_sockets_for_order_placements',
        data.customerLocation.longitude,
        data.customerLocation.latitude,
      )
      const socketId = socketIds[0]
      if (Object.keys(this.socketServer.sockets.server.eio.clients).includes(socketId)) {
        await this.socketServer.to(socketId).emit('placed_order', data)
      } else if (socketId) {
        await this.socketServer.emit('warning', `Socket ${socketId} is not connected anymore.`)
      }
    })
  }
}

module.exports = OrderingSocketClient
