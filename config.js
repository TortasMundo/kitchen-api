const KnexFile = require('knexfile')
const Knex = require('knex')
const testKnex = Knex(KnexFile['tm_test'])
const devKnex = Knex(KnexFile['tm_development'])

module.exports = {
  port: process.env.PORT || 4000,
  redis_host: process.env.REDISCLOUD_URL || 'caching:6379',
  getKnex: isTest => (isTest ? testKnex : devKnex)
}
