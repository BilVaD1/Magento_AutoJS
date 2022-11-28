

const Page = require('./page');


class HomePage extends Page {

    async getErrorMessage() {
        await $('#newsletter-error').waitForDisplayed({ timeout:3000, timeoutMsg:"Error message isn't displayed"})
        let message = await $('#newsletter-error').getText()
        return message
    }

    async getErrorMessageTop() {
        await $("div[data-bind='html: $parent.prepareMessageForHtml(message.text)']").waitForDisplayed({ timeout:3000, timeoutMsg:"Error message isn't displayed"})
        let message = await $("div[data-bind='html: $parent.prepareMessageForHtml(message.text)']").getText()
        return message
    }

    async getNavs () {
        return await $$("#ui-id-2 li.level0")
    }

    async setEmailInFooter (email) {
        await $("#newsletter").setValue(email)
        await $('.action.subscribe.primary').click()
    }

    async navigateToTab_LvL0 (name) {
        const navs = await this.getNavs()
        for(let nav of navs){
            switch(await nav.$("a.level-top.ui-corner-all span:last-child").getText() == name){
                case true:
                    await nav.moveTo()
                    const el0 = await nav.$("ul.level0.submenu.ui-menu.ui-widget.ui-widget-content.ui-corner-all")
                    return el0
            }
        }

    }

    async navigateToTab_LvL2 (name, tabname) {
        const el0 = await this.navigateToTab_LvL0(name)
        const el1 = await el0.$$("li.level1")
        for(const el of el1){
            switch(await el.$("span:last-child").getText() == tabname){
                case true:
                    await el.moveTo()
                    const el2 = await el.$$("li.level2")
                    return el2
            }
        }

    }

    open () {
        return super.open('');
    }
}

module.exports = new HomePage();
