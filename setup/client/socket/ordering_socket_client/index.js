const io = require('socket.io-client')
const config = require('config')
const redis = require('setup/redis')

class OrderingSocketClient {
  constructor(socketServer) {
    this.socketServer = socketServer
  }

  start() {
    const socketClient = io(config.ordering_service_host)
    socketClient.on('placed_order', async response => {
      const redisClient = redis.getRedisClient(response.meta.isTest)
      const socketIds = await redisClient.georadius(
        'kitchen_sockets_for_order_placements',
        response.data.customerLocationLongitude,
        response.data.customerLocationLatitude,
        '20',
        'km'
      )
      const socketId = socketIds[0]
      if (Object.keys(this.socketServer.sockets.server.eio.clients).includes(socketId)) {
        await this.socketServer.to(socketId).emit('placed_order', response.data)
      } else if (socketId) {
        await this.socketServer.emit('warning', `Socket ${socketId} is not connected anymore.`)
      }
    })
  }
}

module.exports = OrderingSocketClient
