class Base {
  constructor(build) {
    this.uri = `${process.env.ORDERING_SERVICE_URL || 'http://ordering-service:4002'}/api`
    this.apiServer = 'ordering-service'
  }
}

module.exports = Base
