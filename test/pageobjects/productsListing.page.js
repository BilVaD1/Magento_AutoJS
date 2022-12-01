const Page = require('./page');


class ListingPage extends Page {

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