'use strict'

const chai = require('chai')
const mongoose = require('mongoose')
const expect = require('chai').expect
const spies = require('chai-spies')
const requestService = require('../services/requestService')
const axios = require('axios')

chai.use(spies)
let spyPost, spyGet, spyPut

before(() => {
  spyGet = chai.spy(axios.get)
  axios.get = spyGet

  spyPost = chai.spy(axios.post)
  axios.post = spyPost

  spyPut = chai.spy(axios.put)
  axios.put = spyPut
})

describe('[requestService] test related to this service', () => {
  it('Get method', () => {
    requestService.get('https://jsonplaceholder.typicode.com/todos/1')
    expect(spyGet).to.be.called()
    expect(axios.get).to.be.spy
  })

  it('Post method', () => {
    requestService.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar'
    })
    expect(spyPost).to.be.called()
    expect(axios.put).to.be.spy
  })

  it('Put method', () => {
    requestService.put('https://jsonplaceholder.typicode.com/posts/1', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
    // expect(spyPut).to.be.called()
    expect(axios.put).to.be.spy
  })
})
