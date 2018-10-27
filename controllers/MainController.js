
module.exports.receive = (event, context, callback) => {
  const body = event.body

  console.log(body)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'data received succefully',
      data: body
    })
  }
  )
}
