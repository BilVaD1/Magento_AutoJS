const data = require('../util/emails')
const signUp = require('../pageobjects/signUp.page')

describe('Registration tests: ', () => {
    beforeEach(async function(){
        await signUp.open()
    })
  
    it('1. Verify the Registration', async () => {
        const users = data.getValidCreds()
        const {email, password, "First Name":FirstName, "Last Name":LastName} = users

        console.log(email, password, FirstName, LastName)

    });
  

  });