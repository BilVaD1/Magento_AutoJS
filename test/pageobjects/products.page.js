const Page = require('./page');


class Products extends Page {
    
    async getItem (index) {
        let item = await $(`li.product-item:nth-child(${index})`)
        await item.scrollIntoView()
        await item.moveTo()
        return await item
    }

    async getAllProducts() {
        return await $$('.products-grid.grid .product-item')
    }

    // Для поиска цен всех продуктов на странице, вызывать метод без аргументов. Если нужна цена одного или нескольких товаров, то ввести их порядковый номер в аргументы функции
    async getPriceOfProducts (...args) {
        let givenPrices = []
        switch (!args.length){ // !args.length проверяем пустой ли массив, если пустой то true
            case false: 
                for(let arg of args){
                    const product = await this.getItem(arg)
                    const price =  +(await product.$('.price').getText()).replace(/[^0-9.]/g,"")
                    givenPrices.push(price) 
                }
                break
            case true: 
                let products = await this.getAllProducts()
                for(let el of products){
                    let price = +(await el.$('.price').getText()).replace(/[^0-9.]/g,"")
                    givenPrices.push(price)
                }
                break
        } 
        return givenPrices
    }

    async selectSize (item, size) {
        //await browser.pause(3000)
        const product = await this.getItem(item)
        const sizes = await product.$$('div.swatch-option.text')
        for(let el of sizes){
            let text = await el.getText()
            switch (await text.includes(size)){
                case true:
                    return await el.click()
            }
        }
    }

    async selectColor (item, color) {
        //await browser.pause(2000)
        const product = await this.getItem(item)
        const colors = await product.$$('div.swatch-option.swatch-option.color')
        for(let el of colors){
            let text = await el.getAttribute('aria-label')
            switch (await text.includes(color)){
                case true:
                    return await el.click()
            }
        }
    }
    
    async addToCart(item) {
        const product = await this.getItem(item)
        let btn = await product.$('button[title="Add to Cart"]')
        await btn.click()
        await $("div[data-ui-id='message-success']").waitForExist({ timeout: 10000, timeoutMsg:"Message about succes added item isn't displayed"})
    }

    async addProductFromListToCart (item, size, color) {
        await this.selectSize(item,size)
        await this.selectColor(item, color)
        await this.addToCart(item)
    }

}

module.exports = new Products();