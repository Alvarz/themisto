'use strict'

/** the main controller of the app */
const MainCtrl = require('./controllers/MainController')
/** .env config */
require('dotenv').config({ path: './.env' })

/** AppController instance. */
const AppCtrl = require('./controllers/AppController')

/**
 * Receive the request from gabymedes to start scrapping
 * @param {object} event
 * @param {object} context
 * @param {Function} callback
 * @return {promise}
 * */
module.exports.receive = async (event, context, callback) => {
  /** frist we authenticate the app */
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }
  /** all find, we pass the request to the controller */
  return MainCtrl.receive(event, context, callback)
}
