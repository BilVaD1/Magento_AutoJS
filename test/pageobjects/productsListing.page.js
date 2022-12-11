const Page = require('./page');


class ListingPage extends Page {

    async getCurrentFilter(){
        const filterBlock = await  $('.filter-current li:first-child span.filter-value')
        await filterBlock.waitForExist({ timeout:5000, timeoutMsg:"The filter block is not displayed"})
        return await filterBlock.getText()
    }

    async selectDirection(way){
        const switcher = await $("(//a[@data-role='direction-switcher'])[1]")
        const swithcerTitle = await switcher.getAttribute('title')
        switch (swithcerTitle.includes(way)){
            case false:
                break
            case true:
                await switcher.click()
                break
        }
    }

    async selectSortBy (sort, way = "Ascending") {
        const sortLabel = await $("(//select[@id='sorter'])[1]")
        await sortLabel.click()
        let options = await sortLabel.$$("option")
        for(const option of options) {
            const nameOfLabel = await option.getText()
            switch (nameOfLabel == sort) {
                case true:
                    option.click()
                    break
            }
            
        }
        
        await this.selectDirection(way)
    }

    get allOptionFilters () {
        return $$('.filter-options-title')
    }

    async selectOptionsOfFliter(el, nameOfOption){
        let options = await el.$$('li')
        second: for(let option of options){
            const text = await option.getText()
            switch(text.includes(nameOfOption)){
                case true:
                    await (await option.$('a')).click()
                    break second
                default:
                    console.log(text)
            }
        }
    }

    async selectFilter (nameOfFilter, nameOfOption){
        let filters = await this.allOptionFilters
        first: for(let filter of filters){
            const text = await filter.getText()
            switch(text==nameOfFilter){
                case true:
                    await filter.scrollIntoView()
                    await filter.click()
                    const optionOfFilter = await filter.nextElement()
                    await this.selectOptionsOfFliter(optionOfFilter, nameOfOption)
                    break first
            }
        }
    }

    open (page,  gender) {
        let LisitngPage
        switch (page){
            case "Jackets":
                LisitngPage = `${gender}/tops-${gender}/jackets-${gender}.html`
                break
            case "HoodiesAndSweatshirts":
                LisitngPage = `${gender}/tops-${gender}/hoodies-and-sweatshirts-${gender}.html`
                break
            case "Tees":
                LisitngPage = `${gender}/tops-${gender}/tees-${gender}.html`
                break
            case "Tanks":
                LisitngPage = `${gender}/tops-${gender}/tanks-${gender}.html`
                break
            case "Pants":
                LisitngPage = `${gender}/bottoms-${gender}/pants-${gender}.html`
                break
            case "Shorts":
                LisitngPage = `${gender}/bottoms-${gender}/shorts-${gender}.html`
                break
            case "Pants":
                LisitngPage = `${gender}/bottoms-${gender}/pants-${gender}.html`
                break
            case "Bags":
                LisitngPage = `${gender}/bags.html`
                break
            case "FitnessEquipment":
                LisitngPage = `${gender}/fitness-equipment.html`
                break
            case "Watches":
                LisitngPage = `${gender}/watches.html`
                break
            default:
                LisitngPage = 'women/tops-women/hoodies-and-sweatshirts-women.html'
                break

        }
        return super.open(LisitngPage);
    }
}

module.exports = new ListingPage();