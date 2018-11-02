'use strict'

require('dotenv').config({ path: './.env' })
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const crawlMercadoLibre = require('../services/mercadoLibreService')

chai.use(spies)

let order
beforeEach(() => {
  order = {
    query: 'television',
    provider: 'mercado_libre',
    options: {
      user: 'theuser',
      password: 'thepassword'

    },
    callbackUrl: 'http://my-endpoint.com/results'
  }
})

describe('[mercadoLibreServices.crawlMercadoLibre]', async () => {
  it('crawl the mercadoLibre ', (done) => {
    crawlMercadoLibre(order)
      .then(res => {
        expect(res).to.be.a('Object')
      })
      .catch(err => {
        console.log(err, 'err')
      })
    done()
  })
})
