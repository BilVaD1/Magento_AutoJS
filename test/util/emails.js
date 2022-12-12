const mails = require('../data/emails.json')
const creds = require('../data/signUp_creds.json')

class emails {
    getValidEmails (){
        return mails.valid
    }

    getInvalidEmails (){
        return mails.invalid
    }

    getValidCreds (){
        return creds.valid.user1
    }
}

module.exports = new emails();