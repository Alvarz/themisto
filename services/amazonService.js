'use strict'

/** puppteer lib */
const puppeteer = require('puppeteer')
/** service url to be connected */

// const amazonURl = 'https://www.amazon.es'
/**
 * compute the given order crawling on amazon.com.ar
 * @param {object} order - the order to be computed
 * @return {object} the response.
 */
const crawlAmazon = async (order) => {
  // order.status = 'fulfilled'
  // order.products = products
  const amazonURl = process.env.AMAZON_HOST

  const browser = await puppeteer.launch({
    headless: true // headless or non-headless
  })
  const page = await browser.newPage()
  console.log('connecting to: ' + amazonURl + ' and searching: "' + order.query + '"')
  /** navigate to page */
  await page.goto(amazonURl)

  /** take a page screenshot */
  // await page.screenshot({ path: 'screenshots/amazon-' + order._id + '.png' })

  /** event to see console logs on browser instance */
  // page.on('console', consoleObj => console.log(consoleObj.text()))
  /** Type into search box. */
  await page.type('#twotabsearchtextbox', order.query)
  /** click on search button */
  await page.click('#nav-search > form > div.nav-right > div > input')

  /** Wait for the results page to load and display the results. */
  // await page.waitForSelector('#Search_Area_div')
  try {
    await page.waitForNavigation({ waitUntil: 'networkidle2' })
  } catch (err) {
    /** if there was some timeout error, set status and close browser */
    console.log('Timeout! amazon crawl failed.', err)
    order.status = 'failed'
    await browser.close()
    return order
  }

  /** take a page screenshot */
  // await page.screenshot({ path: 'screenshots/amazon-search-results-' + order._id + '.png' })

  /* the main node of the products */
  let baseSelector = '.s-item-container'

  try {
    let productsFounded = await page.evaluate(async (baseSelector, amazonURl) => {
      let selected = [...document.querySelectorAll(baseSelector)]

      const parseToFloat = (amount) => {
        return Number(parseFloat(amount)).toLocaleString('en', {
          minimumFractionDigits: 2
        })
      }

      return selected.map(el => {
        const children = el.children

        if (children[0] === undefined) { return null }
        let images = []
        /* array index 6 = prices
         * array index 2 = name
         * array index 1 = thumbnail
         * let images = children[1].children[0].children[0]
         * get the base if the node links and img
        **/
        const imageLinkBase = children[1].firstElementChild.firstElementChild.firstElementChild

        /** get the link */
        const link = imageLinkBase.pathname
        /**  get the image */
        let image = imageLinkBase.firstElementChild.currentSrc
        /**  add image to array */
        images.push(image)
        /*
         * compute the price, here the price is
         * formatted "$ priceDiscuunted $ price regular"
         * so need be parsed to string en replace the $ git a regexp
        */
        // let stringPrice = String(children[6].innerText).replace(/(\r\n\t|\n|\r\t)/gm, '')

        // console.log('link', link)
        // console.log('img', image)

        let price = 0
        let originalPrice = null
        let nameNode = null
        let priceNode = null
        /** if children length > 6 it's an sponsored */
        if (children.length > 7) {
          nameNode = children[4]
          priceNode = children[6]
        } else if (children.length === 7 && children[2].className === 'a-row a-spacing-mini') {
          nameNode = children[2]
          priceNode = children[4]
        } else if (children.length === 7 && children[1].className === 'a-row a-spacing-mini') {
          nameNode = children[1]
          priceNode = children[3]
        } else {
          nameNode = children[2]
          priceNode = children[4]
        }

        const name = nameNode.firstElementChild.textContent.replace('[Patrocinado]', '').trim()

        if (name === '') {
          return null
        }

        if (priceNode !== null) {
          let priceBaseNode = priceNode.firstElementChild
          if (priceBaseNode.children.length > 1) {
            price = priceBaseNode.children[0].textContent.replace('EUR', '').trim()
            let original = priceBaseNode.children[2].textContent.replace('EUR', '').trim()
            if (original !== 'Prime') { originalPrice = original }
          } else {
            price = priceBaseNode.firstElementChild.textContent.replace('EUR', '').trim()
          }
        }

        if (name === null) { return null }

        /*
         * divide it in chunk so we can know if there is only full price
         * or it has discounts
         * */
        // let priceChunks = stringPrice.split('$')
        // if (priceChunks.length > 2) {
        /** has discount */
        // price = priceChunks[2].trim()
        // originalPrice = priceChunks[1].trim()
        // } else {
        /** only full price */
        //  price = priceChunks[1].trim()
        // }

        /** build and return the product object */
        return {
          name: name,
          link: amazonURl + link,
          price: price,
          original_price: originalPrice,
          description: name,
          sku: null,
          category_id: '',
          related_search_queries: [],
          images: images
        }
      })
    }, baseSelector, amazonURl)

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
    console.log(' amazon crawl failed.', err)
    order.status = 'failed'
    await browser.close()
    return order
  }
}

module.exports = crawlAmazon
