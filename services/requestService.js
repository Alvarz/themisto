
const axios = require('axios')

/**
 * request to get values
 * @param {string} url - The url.
 * @return {object} The response.
 */
module.exports.get = (url) => {
  return axios.get(url)
}

/**
 * request to post values
 * @param {string} url - The url.
 * @param {object} data - The data to be posted.
 * @return {object} The response.
 */
module.exports.post = (url, data) => {
  return axios.post(url, data)
}

/**
 * request to post values
 * @param {string} url - The url.
 * @param {object} data - The data to be updated.
 * @return {object} The response.
 */
module.exports.put = (url, data) => {
  return axios.put(url, data)
}
