const config = require('config')
const socketIO = require('socket.io')
const redis = require('setup/redis')

class SocketServer {
  constructor(httpServer, channelListeners) {
    const sockerServer = socketIO(httpServer)
    sockerServer.on('connection', socket => {
      socket.redis = redis.getRedisClient(socket.handshake.query['is-test'])
      channelListeners.map(l => {
        socket.on(l.channel, l.action(socket))
      })
    })
    return sockerServer
  }
}

module.exports = SocketServer
