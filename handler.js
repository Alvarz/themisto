'use strict'

const MainCtrl = require('./controllers/MainController')

module.exports.receive = (event, context, callback) => {
  return MainCtrl.receive(event, context, callback)
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
