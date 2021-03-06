module.exports = {
  port: process.env.PORT || 5000,
  redis_host: process.env.REDISCLOUD_URL || 'caching:6379',
  ordering_service_host: `${process.env.ORDERING_SERVICE_URL || 'http://ordering-service:5002'}`,
}
