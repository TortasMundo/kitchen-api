
module.exports = [{
  channel: 'subscribe_for_order_placements',
  action: (socket) => async (storeLocation) => {
    await socket.redis.geoadd(
      'kitchen_sockets_for_order_placements',
      storeLocation.longitude,
      storeLocation.latitude,
      socket.id,
    )
    socket.on('disconnect', async () => {
      await socket.redis.zrem('kitchen_sockets_for_order_placements', socket.id)
    })
  },
}]