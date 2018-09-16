'use strict'

const chai = require('chai')
const td = require('testdouble')

td.any = td.matchers.anything()

Object.assign(global, {
  assert: chai.assert,
  expect: chai.expect,
  td,
})
