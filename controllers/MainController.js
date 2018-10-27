const { put } = require('../services/requestService')

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

module.exports.receive = (event, context, callback) => {
  const body = event.body
  responseToGanymede(JSON.parse(body))
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'data received succefully',
      data: body
    })
  }
  )
}

const responseToGanymede = (order) => {
  setTimeout(function () {
    order.status = 'fulfilled'
    order.products = products
    console.log(order)

    put(order.callback, order)
      .catch(err => {
        console.log(err)
      })
  }, 3000)
}
