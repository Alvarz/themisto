'use strict'

const SearchOrderCtrl = require('../controllers/SearchOrderController')
const { sendToExternalService } = require('../controllers/ComunicationController')
let _isThemistoReady = true
let launched = false

/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
module.exports.checkIfSendToThemisto = () => {
  if (launched || !_isThemistoReady) {
    console.log('already launched')
    return
  }

  launched = true
  const intervalid = setInterval(() => {
    console.log('doing it on worker')
    SearchOrderCtrl.grabOrderToSendIt()
    cleanCurrentInterval(intervalid)
    // sendToThemisto(order[0])
  }, 1500)
}

/**
 * send the data to themisto.
 * @param {object} data - the data to be sended
 * @return {json} the response.
 */
const cleanCurrentInterval = (intervalid) => {
  clearInterval(intervalid)
  launched = false
  _isThemistoReady = false
}

/**
 * send the data to themisto.
 * @param {string} url - the url to send
 * @param {object} data - the data to be sended
 * @return {json} the response.
 */
module.exports.sendToExternal = (url, data) => {
  sendToExternalService(url, data)
}
