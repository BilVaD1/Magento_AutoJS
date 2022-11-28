/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

    async enterIntoSearch (text){
        await $("#search").setValue(text)
    }

    async getAutocomplate () {
        await $("ul[role='listbox']").waitForDisplayed({ timeout: 5000, timeoutMsg: "Autocomplates are not displayed"})
        const lines = await $$("#search_autocomplete li")
        return lines
    }


    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`/${path}`)
    }
}
