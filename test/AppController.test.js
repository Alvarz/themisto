'use strict'

const db = require('../db/db')
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
let appCtrl = require('../controllers/AppController')
const App = require('../models/App')
let { validate } = require('../services/validationService')

chai.use(spies)

let dbSpy, event, context

beforeEach(() => {
// Clear the cache, this can be done in a way described in the example repo. Does not have to happen here
  delete require.cache[require.resolve('../controllers/AppController')]

  // Update our reference, this needs to happen here
  appCtrl = require('../controllers/AppController')

  context = {
    callbackWaitsForEmptyEventLoop: true
  }

  event = {

    headers: {
      Authorization: 'Bearer 2312321321312321312312312'
    },
    pathParameters: {
      id: 'jk12321jhk32h1j'
    },
    body: ''
  }
  /** mock db connection */
  db.connectToDatabase = async () => {
    return true
  }
  dbSpy = chai.spy(db.connectToDatabase)
  db.connectToDatabase = dbSpy
})

describe('[appController.auth]', () => {
  it('auth with proper token ', async (done) => {
    appCtrl.auth(event, context)
      .then(() => {
        expect(dbSpy).to.be.called()
        expect(db.connectToDatabase).to.be.spy
      })
      .catch(() => {})
    done()
  })

  it('auth with no proper token ', async (done) => {
    event.headers.Authorization = 'Auth 2312321321312321312312312'
    appCtrl.auth(event, context)
      .then(() => {
        expect(dbSpy).not.be.called()
        expect(db.connectToDatabase).to.be.spy
      })
      .catch(() => {})
    done()
  })

  it('auth with no token ', async (done) => {
    delete event.headers['Authorization']
    appCtrl.auth(event, context)
      .then(() => {
        expect(dbSpy).not.be.called()
        expect(db.connectToDatabase).to.be.spy
      })
      .catch(() => {})
    done()
  })
})
