'use strict'

/** mongoose instance. */
const mongoose = require('mongoose')

/** mongoose promises. */
mongoose.Promise = global.Promise

/** the is connected variable. */
let isConnected = false

/**
 * Connection to db.
 * @return {DbInstance} The response.
 */
module.exports.connectToDatabase = () => {
  // if is already connected to the db we reuse the connection
  if (isConnected) {
    console.log('=> using existing database connection')
    return Promise.resolve()
  }

  // else we create a new connection
  console.log('=> using new database connection')
  return mongoose.connect(process.env.DB, { useCreateIndex: true, useNewUrlParser: true })
    .then(db => {
      isConnected = db.connections[0].readyState
    })
    .catch(reason => {
      console.log('the promise was rejected (' + reason + ') .')
    })
}
module.exports.isConnected = isConnected
