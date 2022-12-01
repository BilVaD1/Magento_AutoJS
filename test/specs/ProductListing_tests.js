const ListingPage = require('../pageobjects/productsListing.page');
const Products = require('../pageobjects/products.page');
const miniCart = require('../pageobjects/minicart.page');

const helpers = require('../util/helpers')

describe('Products Listing Page tests: ', () => {

    beforeEach(async function(){
        let EnteredText = process.env.ListingPage //From the CL
        const genderEntered = EnteredText.split('_')[0] //Find the word before '_'
        const ChoosedPage = EnteredText.split('_')[1]  //Find the word after '_'

        await ListingPage.open(ChoosedPage, genderEntered)
        await browser.waitUntil(
        () => browser.execute(() => document.readyState === 'complete'),
        {
            timeout: 10000, 
            timeoutMsg: 'Message on failure'
        }
        );
        await browser.pause(3000) //This browser.pause is needed to resolve the bug about Invalid Form
    })
  
  
    xit('1. Verify the adding item to the mini cart', async () => {
        /*await Products.selectSize(1, 'XL')
        await Products.selectColor(1, 'Orange')
        await Products.addToCart(1)
        await browser.pause(5000)*/
        await Products.addProductFromListToCart(1, 'XL', 'Blue')
        //await Products.addProductFromListToCart(2, 'XL', 'Yellow')
        let number = await miniCart.getQtyInCart()

        expect(number).toBe('1')
    });

    it('2. Verify the sort by Price in the Descending', async () => {
        await ListingPage.selectSortBy("Price", "Descending")
        const prices = await Products.getPriceOfProducts()
        const direction = helpers.determineOrder(prices)
        expect(direction).toBe('descending')
    });

    it('3. Verify the sort by Price in the Ascending', async () => {
        await ListingPage.selectSortBy("Price")
        const prices = await Products.getPriceOfProducts()
        const direction = helpers.determineOrder(prices)
        expect(direction).toBe('ascending')
    });
  

  });