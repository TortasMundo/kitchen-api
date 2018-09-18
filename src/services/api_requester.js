require('isomorphic-fetch')

const api_requester = {}

api_requester.send = async (request, isTest) => {
  const info = {
    method: request.method,
    body: request.method === 'GET' ? undefined : JSON.stringify(request.body),
    headers: {
      'Content-Type': 'application/json',
      'is-test': isTest,
    }
  }
  try {
    const res = await fetch(request.uri + '/' + request.path, info)
    return await res.json()
  }
  catch (err){
     console.log(request.uri + '/' + request.path, info)
     console.log(err)
  }
}

module.exports = api_requester
