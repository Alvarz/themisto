'use strict'

const chai = require('chai')
const expect = require('chai').expect
const spies = require('chai-spies')
const validationService = require('../services/validationService')
const axios = require('axios')

chai.use(spies)

/** statuses array to be tested */
let statusses, err

beforeEach(() => {
  statusses = ['processing', 'fulfilled', 'failed']

  err = {
    errors: {
      name: {
        message: 'Validator "String is empty" failed for path name',
        name: 'ValidatorError',
        path: 'name',
        type: 'String is empty'
      },
      phone: {
        message: 'Validator "String is empty" failed for path name',
        name: 'ValidatorError',
        path: 'name',
        type: 'String is empty' } }
  }
})

describe('[validationService.validate] test the sheme validation errors', () => {
  it('has valid errors', () => {
    let resp = validationService.validate(err)
    expect(resp).be.a('Object')
  })

  it('has no valid errors', () => {
    let resp = validationService.validate({})
    expect(resp).be.a('Object')
  })
})
