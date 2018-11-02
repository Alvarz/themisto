'use strict'

const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const handler = require('../handler')
const MainCtrl = require('../controllers/MainController')
const AppCtrl = require('../controllers/AppController')

chai.use(spies)

let context = {
  callbackWaitsForEmptyEventLoop: true
}

// act as themisto
let event = {
  headers: {
    Authorization: 'Bearer a157a344-a20f-e2fe-f5ac-1cd2dc1ac3db'
  },
  body: JSON.stringify({ name: 'test' })
}

describe('[handler.App] category related functions', () => {
  it('auth test', () => {
    /** set the spy on the method */
    let spyAuth = chai.spy(AppCtrl.auth)
    AppCtrl.auth = spyAuth
    handler.receive(event, context, function () {})
    expect(spyAuth).to.be.called()
    expect(AppCtrl.auth).to.be.spy
  })
})
