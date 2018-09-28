const orderService = require('src/services/order_service')

module.exports = [
  {
    method: 'post',
    path: '/orders/list',
    action: async ctx => {
      const orders = await orderService.list(ctx)
      ctx.body = orders
    },
  },
  {
    method: 'post',
    path: '/orders/update_status',
    action: async ctx => {
      await orderService.updateStatus(ctx)
      ctx.body = {
        success: true
      }
    },
  },
]
