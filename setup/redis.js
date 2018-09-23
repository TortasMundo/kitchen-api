const redis = require('thunk-redis')
const config = require('config')
const Bluebird = require('bluebird')

const createRedisClient = (database) => redis.createClient(config.redis_host, {
  database,
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

module.exports = {
  getRedisClient: (isTest) => createRedisClient(isTest ? 1 : 0)
}