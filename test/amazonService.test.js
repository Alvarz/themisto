'use strict'

require('dotenv').config({ path: './.env' })
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const crawlAmazon = require('../services/amazonService')

chai.use(spies)

let order
beforeEach(() => {
  order = {
    query: 'television',
    provider: 'amazon',
    options: {
      user: 'theuser',
      password: 'thepassword'

    },
    callbackUrl: 'http://my-endpoint.com/results'
  }
})

describe('[amazonServices.crawlAmazon]', async () => {
  it('crawl the amazon ', (done) => {
    crawlAmazon(order)
      .then(res => {
        expect(res).to.be.a('Object')
      })
      .catch(err => {
        console.log(err, 'err')
      })
    done()
  })
})
