const ListOrdersRequest = require('src/services/requests/ordering-service/list_orders')
const UpdateOrderStatusRequest = require('src/services/requests/ordering-service/update_order_status')
const apiRequester = require('src/services/api_requester')

const list = async ctx => {
  const request = new ListOrdersRequest(ctx.request.body)
  return await apiRequester.send(request, ctx.request.headers)
}

const updateStatus = async ctx => {
  const request = new UpdateOrderStatusRequest(ctx.request.body)
  return await apiRequester.send(request, ctx.request.headers)
}

module.exports = {
  list,
  updateStatus
}