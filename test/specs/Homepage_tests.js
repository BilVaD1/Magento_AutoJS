const HomePage = require('../pageobjects/home.page');
const Products = require('../pageobjects/products.page');
const miniCart = require('../pageobjects/minicart.page');

const helpers = require('../util/helpers')
const Emails = require('../util/emails')

describe('Home Page tests: ', () => {

  beforeEach(async function(){
    await HomePage.open()
    await browser.waitUntil(
      () => browser.execute(() => document.readyState === 'complete'),
      {
        timeout: 10000, 
        timeoutMsg: 'Message on failure'
      }
    );
    await browser.pause(3000) //This browser.pause is needed to resolve the bug about Invalid Form
  })


  it('1. Verify the adding item to the mini cart', async () => {
    /*await Products.selectSize(1, 'XL')
    await Products.selectColor(1, 'Orange')
    await Products.addToCart(1)
    await browser.pause(5000)*/
    await Products.addProductFromListToCart(1, 'XL', 'Orange')
    await Products.addProductFromListToCart(2, 'XL', 'Yellow')
    let number = await miniCart.getQtyInCart()

    expect(number).toBe('2')
  });


  xit('2. Verify the price in the Mini Cart', async () => {
    let prices = await Products.getPriceOfProducts(2, 1)
    // console.log(await Products.getPriceOfProducts()) // Находими цены для всех товаров

    let sumPrices = await helpers.sumPrices(prices)

    //### Comment out this part of code if you use this test case with the "1. Verify the adding item to the mini cart"
    await Products.addProductFromListToCart(1, 'XL', 'Orange')
    await Products.addProductFromListToCart(2, 'XL', 'Yellow')

    const priceTotal = await miniCart.getCartPriceTotal()

    expect(priceTotal).toEqual(sumPrices)
  });


  xit('3. Verify the emmail field in the footer with Invalid emails', async () => {
    let invalids = Emails.getInvalidEmails()
    for(key in invalids){
      //console.log(invalids[key])
      await HomePage.setEmailInFooter(invalids[key])
      let answ = await HomePage.getErrorMessage()
      //console.log(answ)
      await expect(answ).toContain('Please enter a valid email address')
    }
  });

  xit('4. Verify the emmail field in the footer with valid emails(registered)', async () => {
    let valids = Emails.getValidEmails()
    for(key in valids){
      //console.log(valids[key])
      await HomePage.setEmailInFooter(valids[key])
      let answ = await HomePage.getErrorMessageTop()
      //console.log(answ)
      await expect(answ).toContain('is already subscribed')
    }
  });

  xit('5. Check the navigation tabs', async () => {
    let navs = await HomePage.getNavs()
    let lng = navs.length
    expect(lng).toEqual(6)

    /*for(let el of navs){
      await el.moveTo()
      const el1 = await el.$("ul.level0.submenu.ui-menu.ui-widget.ui-widget-content.ui-corner-all")
      switch (await el.$("a.level-top.ui-corner-all span:last-child").getText()){
        case 'Women':
          await expect(el1).toBeDisplayed()

          const el2_w = await el1.$$("li.level1")
          for(let el_el2 of el2_w){
            await el_el2.moveTo()
            const el_3 = await el_el2.$$("li.level2")
            switch (await el_el2.$("span:last-child").getText()){
              case "Tops":
                await expect(el_3.length).toBe(4)
                break
              case "Bottoms":
                await expect(el_3.length).toBe(2)
                break
            }
          }
          break

        case 'Men':
          await expect(el1).toBeDisplayed()

          const el2_m = await el1.$$("li.level1")
          for(let el_el2 of el2_m){
            await el_el2.moveTo()
            const el_3 = await el_el2.$$("li.level2")
            switch (await el_el2.$("span:last-child").getText()){
              case "Tops":
                await expect(el_3.length).toBe(4)
                break
              case "Bottoms":
                await expect(el_3.length).toBe(2)
                break
            }
          }
          break

        case 'Gear':
          await expect(await el.$("ul.level0.submenu.ui-menu.ui-widget.ui-widget-content.ui-corner-all")).toBeDisplayed()
          break

        case 'Training':
          await expect(await el.$("ul.level0.submenu.ui-menu.ui-widget.ui-widget-content.ui-corner-all")).toBeDisplayed()
          break
      }
    }*/
  });

  xit('5.1 Check the navigation tabs of the 1st lvl', async () => {
    const tabs = ["Gear", "Women", "Men", "Training"]
    for(const tab of tabs){
      const tabDisplay = await HomePage.navigateToTab_LvL0(tab)
      await expect(tabDisplay).toBeDisplayed()
    }
  });

  xit('5.2  Check the navigation tabs of the 2nd lvl', async () => {
    const tabs = ["Women", "Men"]
    const tabs_lvl1 = ["Tops", "Bottoms"]
    for(const tab of tabs){
      for(const tab_lvl1 of tabs_lvl1){
        let els = await HomePage.navigateToTab_LvL2(tab, tab_lvl1)
        await expect(els).toBeDisplayed()
      }
    }
  });

  xit('6. Check the searching field', async () => {
    await HomePage.enterIntoSearch("Tee")
    const lines = await HomePage.getAutocomplate()
    for(const line of lines){
      await expect(await line).toHaveTextContaining(['Tee', 'tee'])
    }
  });
});


