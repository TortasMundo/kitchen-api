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
]
