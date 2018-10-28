'use strict'

const products = [{
  'name': 'silla',
  'sku': '1234',
  'price': '12.78',
  'original_price': '12.78',
  'category_id': '5bd4889690d3a8015eecec8f',
  'description': 'product description',
  'images': ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
  'related_search_queries': ['myquery1', 'muquery2']

},
{
  'name': 'silla',
  'sku': '1234',
  'price': '12.78',
  'original_price': '12.78',
  'category_id': '5bd4889690d3a8015eecec8f',
  'description': 'product description',
  'images': ['https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200', 'https://picsum.photos/200'],
  'related_search_queries': ['myquery1', 'muquery2']

}]
/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
const crawlAmazon = (order) => {
  order.status = 'fulfilled'
  order.products = products
  return order
}

module.exports = crawlAmazon
