'use strict'

const requestService = require('../services/requestService')
const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
let mainCtrl = require('../controllers/MainController')
const searchServices = require('../services/searchServices')

chai.use(spies)

let event, mlSpy, eaSpy, amaSpy, putSpy

beforeEach(() => {
  requestService.put = async () => {
    return true
  }
  /** mock method for test purposes */
  searchServices.searchOnEasy = async (order) => {
    return true
  }

  /** mock method for test purposes */
  searchServices.searchOneAmazon = async (order) => {
    return true
  }

  /** mock method for test purposes */
  searchServices.searchOnML = async (order) => {
    return true
  }

  // Clear the cache, this can be done in a way described in the example repo. Does not have to hmainen here
  delete require.cache[require.resolve('../controllers/MainController')]

  // Update our reference, this needs to hmainen here
  mainCtrl = require('../controllers/MainController')

  event = {
    body: {
      _id: '',
      query: 'television',
      provider: 'amazon',
      options: {
        user: 'theuser',
        password: 'thepassword'

      },
      callbackUrl: 'http://my-endpoint.com/results'
    }
  }

  mlSpy = chai.spy(searchServices.searchOnML)
  searchServices.searchOnML = mlSpy

  amaSpy = chai.spy(searchServices.searchOneAmazon)
  searchServices.searchOneAmazon = amaSpy

  eaSpy = chai.spy(searchServices.searchOnEasy)
  searchServices.searchOnEasy = eaSpy

  putSpy = chai.spy(requestService.put)
  requestService.put = putSpy
})

describe('[mainController.receive]', () => {
  it('receive the request for amazon', async (done) => {
    let body = event.body
    body.provider = 'amazon'
    event.body = JSON.stringify(body)
    mainCtrl.receive(event, {})
      .then(() => {
        expect(amaSpy).to.be.called()
        expect(searchServices.searchOneAmazon).not.be.spy

        expect(putSpy).to.be.called()
        expect(requestService.put).not.be.spy
      })
      .catch(() => {})
    done()
  })

  it('receive the request for easy', async (done) => {
    let body = event.body
    body.provider = 'easy'
    event.body = JSON.stringify(body)
    mainCtrl.receive(event, {})
      .then(() => {
        expect(eaSpy).to.be.called()
        expect(searchServices.searchOnEasy).not.be.spy

        expect(putSpy).to.be.called()
        expect(requestService.put).not.be.spy
      })
      .catch(() => {})
    done()
  })

  it('receive the request for mercado_libre', async (done) => {
    let body = event.body
    body.provider = 'mercado_libre'
    event.body = JSON.stringify(body)
    mainCtrl.receive(event, {})
      .then(() => {
        expect(mlSpy).to.be.called()
        expect(searchServices.searchOnML).not.be.spy

        expect(putSpy).to.be.called()
        expect(requestService.put).not.be.spy
      })
      .catch(() => {})
    done()
  })

  it('response to ganymedes', () => {
    event.body._id = '13445555'
    mainCtrl.responseToGanymede(event.body)

    setTimeout(() => {
      expect(putSpy).to.be.called()
      expect(requestService.put).not.be.spy
    }, 3010)
  })
})
