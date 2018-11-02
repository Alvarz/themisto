'use strict'
/** @module models/App */

/** Mongose lib. */
const mongoose = require('mongoose')

/** App Shema. */
const AppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false
  },
  token: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true }, { strict: true })

/** export. */
module.exports = mongoose.model('App', AppSchema)
