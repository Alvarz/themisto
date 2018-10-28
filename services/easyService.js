'use strict'

/** puppteer lib */
const puppeteer = require('puppeteer')
/** service url to be connected */
const easyURl = 'https://www.easy.com.ar'

/**
 * compute the given order crawling on easy.com.ar
 * @param {object} order - the order to be computed
 * @return {object} the response.
 */
const crawlEasy = async (order) => {
  // order.status = 'fulfilled'
  // order.products = products

  const browser = await puppeteer.launch({
    headless: true // headless or non-headless
  })
  const page = await browser.newPage()
  console.log('connecting to: ' + easyURl + ' and searching: "' + order.query + '"')
  /** navigate to page */
  await page.goto(easyURl)

  /** take a page screenshot */
  // await page.screenshot({ path: 'screenshots/easy-' + order._id + '.png' })

  /** event to see console logs on browser instance */
  // page.on('console', consoleObj => console.log(consoleObj.text()))
  /** Type into search box. */
  await page.type('#SimpleSearchForm_SearchTerm', order.query)
  /** click on search button */
  await page.click('#WC_CachedHeaderDisplay_button_1')

  /** Wait for the results page to load and display the results. */
  // await page.waitForSelector('#Search_Area_div')
  try {
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
  } catch (err) {
    /** if there was some timeout error, set status and close browser */
    console.log('Timeout! easy crawl failed.', err)
    order.status = 'failed'
    await browser.close()
    return order
  }

  /** take a page screenshot */
  // await page.screenshot({ path: 'screenshots/easy-search-results-' + order._id + '.png' })

  /* the main node of the products */
  let nameSelector = '#Search_Result_div > div:nth-child(4) .thumb-product'

  try {
    let productsFounded = await page.evaluate(async (nameSelector, easyURl) => {
      let selected = [...document.querySelectorAll(nameSelector)]

      return selected.map(el => {
        const children = el.children
        let images = []
        /* array index 6 = prices
         * array index 2 = name
         * array index 1 = thumbnail
         * let images = children[1].children[0].children[0]
         * get the base if the node links and img
        **/
        const imageLinkBase = children[1].firstElementChild.firstElementChild.firstElementChild.firstElementChild.firstElementChild

        /** get the link */
        const link = imageLinkBase.pathname
        /**  get the image */
        let image = imageLinkBase.firstElementChild.currentSrc
        /**  add image to array */
        images.push(image)
        let price = 0
        let originalPrice = null
        /*
         * compute the price, here the price is
         * formatted "$ priceDiscuunted $ price regular"
         * so need be parsed to string en replace the $ git a regexp
        */
        let stringPrice = String(children[6].innerText).replace(/(\r\n\t|\n|\r\t)/gm, '')

        /*
         * divide it in chunk so we can know if there is only full price
         * or it has discounts
         * */
        let priceChunks = stringPrice.split('$')
        if (priceChunks.length > 2) {
          /** has discount */
          price = priceChunks[2]
          originalPrice = priceChunks[1]
        } else {
          /** only full price */
          price = priceChunks[1]
        }

        /** build and return the product object */
        return {
          name: children[2].innerText,
          link: easyURl + link,
          price: parseFloat(price),
          original_price: parseFloat(originalPrice),
          description: children[2].innerText,
          sku: null,
          category_id: '',
          related_search_queries: [],
          images: images
        }
      })
    }, nameSelector, easyURl)

    /** set the estatus */
    order.status = 'fulfilled'
    /** set the products */
    order.products = productsFounded

    /** close the browser and return the order */
    await browser.close()
    return order
  } catch (err) {
    /** if there was some error, set status to failed and close the browser */
    console.log(' easy crawl failed.', err)
    order.status = 'failed'
    await browser.close()
    return order
  }
}

module.exports = crawlEasy
