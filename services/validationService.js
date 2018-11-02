/** @module services/validationservice */

/** @module statuses enum array */

/**
 * validate the data.
 * @param {object} _body - the request body
 * @return {object}.
 */
module.exports.validate = (data) => {
  let errors = []
  if (!data || !data.hasOwnProperty('errors')) {
    return {
      statusCode: 402,
      body: JSON.stringify({
        message: 'There is error not object'
      })
    }
  }

  for (let key in data.errors) {
    let msg = data.errors[key].message || ''

    let err = {
      'key': key,
      'message': msg
    }
    errors.push(err)
  }
  return {
    statusCode: data.statusCode || 402,
    body: JSON.stringify({
      message: 'There is validation errors',
      data: errors
    })
  }
}
