const { put } = require('../services/requestService')

const searchServices = require('../services/searchServices')

/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
module.exports.receive = (event, context, callback) => {
  const order = JSON.parse(event.body)

  dispatchSearchOrder(order)
    .then(response => {
      responseToGanymede(response)
    })
    .catch(err => {
      console.warn(err.message)
    })

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'data received succefully',
      data: order
    })
  }
  )
}
/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
const dispatchSearchOrder = (order) => {
  let resp = {}
  switch (order.provider) {
    case 'easy':
      resp = searchServices.searchOnEasy(order)
      break
    case 'amazon':
      resp = searchServices.searchOneAmazon(order)
      break
    case 'mercado_libre':
      resp = searchServices.searchOnML(order)
      break
    default:
      resp = searchServices.searchOnEasy(order)
      break
  }
  return resp
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
