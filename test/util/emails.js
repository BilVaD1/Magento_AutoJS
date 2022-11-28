const mails = require('../data/emails.json')

class emails {
    getValidEmails (){
        return mails.valid
    }

    getInvalidEmails (){
        return mails.invalid
    }
}

module.exports = new emails();