const orderService = require('src/services/order_service')

module.exports = [
  {
    method: 'post',
    path: '/orders/list',
    action: async ctx => {
      ctx.body = {
        success: true,
        data: await orderService.list(ctx),
      }
    },
  },
]
