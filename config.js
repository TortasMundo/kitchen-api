const KnexFile = require('knexfile')
const Knex = require('knex')
const testKnex = Knex(KnexFile['test'])
const devKnex = Knex(KnexFile['development'])

module.exports = {
  port: process.env.PORT || 4000,
  redis_host: process.env.REDISCLOUD_URL || 'caching:6379',
  ordering_service_host: `${process.env.ORDERING_SERVICE_URL || 'http://ordering-service:4002'}`,
  getKnex: isTest => (isTest ? testKnex : devKnex)
}
