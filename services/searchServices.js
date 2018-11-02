'use strict'

const crawlEasy = require('./easyService')
const crawlAmazon = require('./amazonService')
const crawlMercadoLibre = require('./mercadoLibreService')

/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
module.exports.searchOnEasy = (order) => {
  return crawlEasy(order)
}

/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
module.exports.searchOnAmazon = (order) => {
  return crawlAmazon(order)
}

/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
module.exports.searchOnML = (order) => {
  return crawlMercadoLibre(order)
}
