'use strict'

/** puppteer lib */
const puppeteer = require('puppeteer')
/** service url to be connected */
/**
 * check if must send an order to themisto
 * @return {json} the response.
 */
const crawlMercadoLibre = async (order) => {
  // order.status = 'fulfilled'
  // order.products = products
  const mlURl = process.env.ML_HOST

  const browser = await puppeteer.launch({
    headless: true // headless or non-headless
  })
  const page = await browser.newPage()
  console.log('connecting to: ' + mlURl + ' and searching: "' + order.query + '"')
  /** navigate to page */
  await page.goto(mlURl)

  /** take a page screenshot */
  // await page.screenshot({ path: 'screenshots/mercado libre-' + order._id + '.png' })

  /** Type into search box. */
  await page.type('body > header > div > form > input', order.query)
  /** click on search button */
  await page.click('body > header > div > form > button.nav-search-btn')

  /** Wait for the results page to load and display the results. */
  // await page.waitForSelector('#Search_Area_div')
  try {
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
  } catch (err) {
    /** if there was some timeout error, set status and close browser */
    console.log('Timeout! mercado libre crawl failed.', err)
    order.status = 'failed'
    await browser.close()
    return order
  }

  /** take a page screenshot */
  // await page.screenshot({ path: 'screenshots/mercado libre-search-results-' + order._id + '.png' })

  /* the main node of the products */
  let nameSelector = '#searchResults > li'

  try {
  /** event to see console logs on browser instance */
    page.on('console', consoleObj => console.log(consoleObj.text()))

    let productsFounded = await page.evaluate(async (nameSelector, mlURl) => {
      let selected = [...document.querySelectorAll(nameSelector)]

      return selected.map(el => {
        let images = []
        /*
         * array index 1 = description
         * array index 0 = thumbnail
         * get the base if the node links and img
        **/
        const baseNode = el.firstElementChild.children

        /** get the link */
        let link = baseNode[0].firstElementChild.firstElementChild.firstElementChild.href
        /**  get the image */
        let image = baseNode[0].firstElementChild.firstElementChild.firstElementChild.firstElementChild.currentSrc
        /**  add image to array */
        images.push(image)
        /*
         *
         * array index 0 = title/name
         * array index 1 = price
         * array index 2 = stack
         * array index 3 = reviews
         *
         * */
        const descriptionNode = baseNode[1].firstElementChild
        let name = descriptionNode.firstElementChild.textContent

        if (name === '') {
          return null
        }
        let price = 0
        let originalPrice = null
        /*
         * index if have discount
         *
         * array index 0 = price old
         * array index 1 = price
         * array index 2 = % discount
         *
         * else
         *
         * array index 0 = price;
         *
         * */

        const priceNode = descriptionNode.children[1].firstElementChild.children

        /** if haven't discount length < 2 */
        if (priceNode.length > 1) {
          /** get the price and clean it to remove the $ symbol */
          price = priceNode[1].textContent.replace('$', '').trim()
        } else {
          /*  the product have discount */
          let priceOld = priceNode[0]
          /** get the original price and clean it to remove the $ symbol */
          originalPrice = priceOld.textContent.replace('$', '').trim()
          /** due the discount, our priceNode main change so we look for it
            * again */
          let priceNormal = descriptionNode.children[1].children[1]
          /** get the price and clean it to remove the $ symbol */
          price = priceNormal.children[1].textContent.replace('$', '').trim()
        }

        /** build and return the product object */
        return {
          name: name.trim(),
          link: mlURl + link.trim(),
          price: price,
          original_price: originalPrice,
          description: name.trim(),
          sku: null,
          category_id: '',
          related_search_queries: [],
          images: images
        }
      })
    }, nameSelector, mlURl)

    /** set the estatus */
    order.status = 'fulfilled'
    /** set the products */
    order.products = productsFounded.filter((el) => {
      return el !== null
    })

    /** close the browser and return the order */
    await browser.close()
    return order
  } catch (err) {
    /** if there was some error, set status to failed and close the browser */
    console.log(' mercado libre crawl failed.', err)
    order.status = 'failed'
    await browser.close()
    return order
  }
}

module.exports = crawlMercadoLibre
