'use strict'

const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
let searchServ = require('../services/searchServices')
let crawlEasy = require('../services/easyService')
let crawlAmazon = require('../services/amazonService')
let crawlMercadoLibre = require('../services/mercadoLibreService')

chai.use(spies)

/** statuses array to be tested */
let order, eaSpy, amaSpy, mlSpy

beforeEach(() => {
// Clear the cache, this can be done in a way described in the example repo. Does not have to happen here
  delete require.cache[require.resolve('../services/searchServices')]

  // Update our reference, this needs to happen here
  searchServ = require('../services/searchServices')

  order = {
    query: '',
    provider: '12321',
    _id: '123213'
  }

  crawlEasy = () => {
    return true
  }

  crawlAmazon = () => {
    return true
  }

  crawlMercadoLibre = () => {
    return true
  }

  eaSpy = chai.spy(crawlEasy)
  crawlEasy = eaSpy

  amaSpy = chai.spy(crawlAmazon)
  crawlAmazon = amaSpy

  mlSpy = chai.spy(crawlMercadoLibre)
  crawlMercadoLibre = mlSpy
})

describe('[validationService.validate] test the sheme validation errors', () => {
  it('search on easy', () => {
    searchServ.searchOnEasy(order)
      .then(() => {
        expect(eaSpy).to.be.called()
      })
    expect(crawlEasy).to.be.spy
  })

  it('search on amazon', () => {
    searchServ.searchOnAmazon(order)
      .then(() => {
        expect(amaSpy).to.be.called()
      })
    expect(crawlAmazon).to.be.spy
  })

  it('search on mercado Libre', () => {
    searchServ.searchOnML(order)
      .then(() => {
        expect(mlSpy).to.be.called()
      })
    expect(crawlMercadoLibre).to.be.spy
  })
})
