'use strict'

const MainCtrl = require('./controllers/MainController')

require('dotenv').config({ path: './.env' })
/** AppController instance. */
const AppCtrl = require('./controllers/AppController')

module.exports.receive = async (event, context, callback) => {
  let allowed = await AppCtrl.auth(event.headers)
  if (!allowed) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' })
    }
  }

  return MainCtrl.receive(event, context, callback)
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
