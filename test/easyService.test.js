'use strict'

require('dotenv').config({ path: './.env' })
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const crawlEasy = require('../services/easyService')

chai.use(spies)

let order
beforeEach(() => {
  order = {
    query: 'television',
    provider: 'easy',
    options: {
      user: 'theuser',
      password: 'thepassword'

    },
    callbackUrl: 'http://my-endpoint.com/results'
  }
})

describe('[easyServices.crawlEasy]', async () => {
  it('crawl the easy ', (done) => {
    crawlEasy(order)
      .then(res => {
        expect(res).to.be.a('Object')
      })
      .catch(err => {
        console.log(err, 'err')
      })
    done()
  })
})
