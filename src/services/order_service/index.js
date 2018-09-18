const ListOrdersRequest = require('src/services/requests/ordering-service/list_orders')
const apiRequester = require('src/services/api_requester')

const list = async ctx => {
  const request = new ListOrdersRequest(ctx.request.body)
  ctx.body = await apiRequester.send(request, ctx.request.headers['is-test'])
}

module.exports = {
  list
}