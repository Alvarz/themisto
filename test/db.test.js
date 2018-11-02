// 'use strict'

const chai = require('chai')
const mongoose = require('mongoose')
const expect = require('chai').expect
let db = require('../db/db')
const spies = require('chai-spies')
chai.use(spies)
let spy

before(() => {
// Clear the cache, this can be done in a way described in the example repo. Does not have to happen here
  delete require.cache[require.resolve('../db/db')]

  // Update our reference, this needs to happen here
  db = require('../db/db')

  spy = chai.spy(mongoose.connect)
  mongoose.connect = spy
})

describe('[DB] methods to connect with the db', () => {
  it('test db new connection', (done) => {
    expect(db.isConnected).to.be.false
    db.connectToDatabase()
      .then(() => {
        expect(db.isConnected).to.be.true
        expect(spy).to.be.called()
      })
      .catch(err => {
        expect(err).not.be.null
        expect(db.isConnected).to.be.false
      })
    mongoose.connection.close()
    done()
  })

  it(' test using current conn', (done) => {
    db.isConnected = true

    db.connectToDatabase()
      .then(() => {
        expect(db.isConnected).to.be.true
        expect(spy).to.not.be.called()
      })
      .catch(err => {
        expect(err).not.be.null
      })
    mongoose.connection.close()
    done()
  })
})
