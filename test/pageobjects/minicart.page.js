const Page = require('./page');


class miniCart extends Page {

    async openMiniCart () {
        await $('.minicart-wrapper').click()
    }

    async getQtyInCart () {
        await $(`span[data-bind="css: { empty: !!getCartParam('summary_count') == false && !isLoading() }, blockLoader: isLoading"]`).waitForDisplayed({ timeout:5000, 
            timeoutMsg:"The qty of cart isn't displayed"})
        let el = await $(`.counter-number`)
        return await (el).getText()
    }

    async getCartPriceTotal () {
        await $(`span[data-bind="css: { empty: !!getCartParam('summary_count') == false && !isLoading() }, blockLoader: isLoading"]`).waitForDisplayed({ timeout:5000, 
            timeoutMsg:"The qty of cart isn't displayed"})
        await this.openMiniCart()
        await $('.minicart-items-wrapper').waitForExist({ timeout: 5000, timeoutMsg:"The item(s) is not displayed in the mini cart"})
        return +(await $("span[data-bind='html: cart().subtotal_excl_tax'] .price").getText()).replace(/[^0-9.]/g,"")
    }
    
}

module.exports = new miniCart();