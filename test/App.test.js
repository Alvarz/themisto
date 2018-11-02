'use strict'

const expect = require('chai').expect
const App = require('../models/App')

describe('[models.App] test App Schema model', () => {
  describe('schema empty', () => {
    it('should have validation errors', () => {
      let m = new App()
      m.validate((err) => {
        expect(err.errors.name).to.exist
        expect(err.errors.token).to.exist
      })
    })
  })

  describe('schema full', () => {
    it('should have validation errors', () => {
      let m = new App({
        'name': 'televisor',
        'token': Math.random()
      })
      m.validate((err) => {
        expect(err).to.not.exist
      })
    })
  })
})
