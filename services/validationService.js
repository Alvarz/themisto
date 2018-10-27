/** @module services/validationservice */

/** @module statuses enum array */
var { statusses } = require('../models/SearchOrder')

/**
 * Validate the enums on model.
 * @param {object} data - The data to be validated.
 * @param {callback} callback - callback method to return the response.
 * @return {json} The response.
 */
module.exports.validateSearchUpdate = (data, callback) => {
  if (!statusses.includes(data)) {
    callback(null, {
      statusCode: 402,
      body: JSON.stringify({
        message: data + ' is not a proper status for search order'
      })
    })
  }
}
/**
 * validate the data.
 * @param {object} _body - the request body
 * @return {object}.
 */
module.exports.validate = (data, callback) => {
  let errors = []
  if (!data || !data.hasOwnProperty('errors')) {
    return callback(null, {
      statusCode: 402,
      body: JSON.stringify({
        message: 'There is error not object'
      })
    })
  }

  for (let key in data.errors) {
    let msg = data.errors[key].message || ''

    let err = {
      'key': key,
      'message': msg
    }
    errors.push(err)
  }
  return callback(null, {
    statusCode: data.statusCode || 402,
    body: JSON.stringify({
      message: 'There is validation errors',
      data: errors
    })
  })
}
