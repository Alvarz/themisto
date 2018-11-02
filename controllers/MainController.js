const { put } = require('../services/requestService')

const searchServices = require('../services/searchServices')

/**
 * receive the order from ganymedes
 * @param {object} event
 * @param {context} event
 * @return {json} the response.
 */
module.exports.receive = async (event, context) => {
  const order = JSON.parse(event.body)

  try {
    let response = await dispatchSearchOrder(order)
    responseToGanymede(response)
  } catch (err) {
    console.warn(err.message)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'data received succefully',
        data: order
      })
    }
  }
}
/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
const dispatchSearchOrder = async (order) => {
  switch (order.provider) {
    case 'easy':
      return searchServices.searchOnEasy(order)
    case 'amazon':
      return searchServices.searchOnAmazon(order)
    case 'mercado_libre':
      return searchServices.searchOnML(order)
    default:
      return searchServices.searchOnEasy(order)
  }
}

/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
const responseToGanymede = (order) => {
  setTimeout(() => {
    // order.products = products

    console.log(order)
    console.log('sending back to callback url the order : ' + order._id, 'with status: ' + order.status)

    put(order.callbackMain, order)
      .catch(err => {
        console.log(err)
      })
  }, 3000)
}

module.exports.responseToGanymede = responseToGanymede
