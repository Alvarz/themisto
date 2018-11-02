'use estrict'
/** @module controllers/AppController */

/** The conection to db method. */
const { connectToDatabase } = require('../db/db')

/** search product model. */
const App = require('../models/App')

/**
 * updated the searchObject data of given id.
 * @async
 * @param {object} event - The http event.
 * @param {object} context - The context.
 * @return {promise} The response.
 */
module.exports.auth = async (headers) => {
  /** if has no Auth key shouldn't be allowed */
  if (!headers.hasOwnProperty('Authorization')) return false

  let ckunks = headers.Authorization.split(' ')

  /** if has no Auth is not Bearer  shouldn't be allowed */
  if (ckunks.length < 2 || ckunks[0] !== 'Bearer') return false
  let token = ckunks[1]

  try {
    /** get the database instance */
    await connectToDatabase()
  } catch (err) {
    console.log(err)
    return false
  }

  /** wher get the number of entries with given token */
  let count = await App.countDocuments({ token: token })

  return count > 0
}
