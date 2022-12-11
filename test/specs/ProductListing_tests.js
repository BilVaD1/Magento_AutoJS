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
        let EnteredText = process.env.ListingPage //From the CL
        const ChoosedPage1 = EnteredText.split('_')[1]  //Find the word after '_'
        switch(ChoosedPage1==="Shorts" || ChoosedPage1==="Pants"){ //Specify the type of product size according to the Product Listing page
            case true:
                await Products.addProductFromListToCart(1, '32', 'Red')
                break
            case false:
                await Products.addProductFromListToCart(2, 'XL', 'Yellow')
                break
        }
        let number = await miniCart.getQtyInCart()

        expect(number).toBe('1')
    });

    xit('2. Verify the sort by Price in the Descending', async () => {
        await ListingPage.selectSortBy("Price", "Descending")
        const prices = await Products.getPriceOfProducts()
        const direction = helpers.determineOrder(prices)
        expect(direction).toBe('descending')
    });

    xit('3. Verify the sort by Price in the Ascending', async () => {
        await ListingPage.selectSortBy("Price")
        const prices = await Products.getPriceOfProducts()
        const direction = helpers.determineOrder(prices)
        expect(direction).toBe('ascending')
    });

    xit('4. Verify the sort by Product Name in the Ascending Alphabetical Order', async () => {
        await ListingPage.selectSortBy("Product Name")
        const productsNames = await Products.getNamesOfProducts()
        console.log(productsNames)
        const order = helpers.determineAlphabeticalOrder(productsNames)
        expect(order).toBe("Alphabetical")
    });

    xit('5. Verify the sort by Product Name in the Reverse Alphabetical Order', async () => {
        await ListingPage.selectSortBy("Product Name", "Descending")
        const productsNames = await Products.getNamesOfProducts()
        const order = helpers.determineAlphabeticalOrder(productsNames)
        expect(order).toBe("Reverse Alphabetical")
    });

    it('6. Verify the filter is displayed', async () => {
        await ListingPage.selectFilter("MATERIAL", "Cotton")  
        const filter = await ListingPage.getCurrentFilter()
        expect(filter).toContain('Cotton')
    });
  

  });