'use estrict'
/** @module controllers/AppController */

/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

/** search product model. */
const App = require('../models/App')

/**
 * updated the searchObject data of given id.
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {json} The response.
 */
module.exports.auth = async (headers) => {
  if (!headers.hasOwnProperty('Authorization')) return false

  let ckunks = headers.Authorization.split(' ')

  if (ckunks.length < 2 || ckunks[0] !== 'Bearer') return false
  let token = ckunks[1]

  try {
    await connectToDatabase()
  } catch (err) {
    console.log(err)
    return false
  }

  let count = await App.countDocuments({ token: token })

  console.log(count)
  return count > 0
}
