const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
    /**
     * define selectors using getter methods
     */
    open () {
        return super.open('customer/account/create/');
    }
}

module.exports = new HomePage();
