const { expect, browser, $ } = require('@wdio/globals')

// describe('My Login application', () => {
//     it('should login with valid credentials', async () => {
//         await browser.url(`https://the-internet.herokuapp.com/login`)

//         await $('#username').setValue('tomsmith')
//         await $('#password').setValue('SuperSecretPassword!')
//         await $('button[type="submit"]').click()

//         await expect($('#flash')).toBeExisting()
//         await expect($('#flash')).toHaveTextContaining(
//             'You logged into a secure area!')
//     })
// })

describe("Test suite", () => {

    it("Loading home page of Wikipedia", async () => {
    await browser.url("https://parabank.parasoft.com/parabank/index.htm");
    const pageTitle = await browser.getTitle();

    expect(pageTitle).toEqual("ParaBank | Welcome | Online Banking");
    });

    
    it("Checking that link from navigation works", async() => {
        await $("//a[text()='Services']").click();
        
        const pageTitle = await browser.getTitle();
        expect(pageTitle).toEqual("ParaBank | Services");

    });
    
    it("Trying to login without entering user info", async() => {
        await $("input[type='Submit']").click();

        const usernameError = await $("p.error");

        expect(await usernameError.getText()).toEqual("Please enter a username and password.")
    });

    it("Trying to login while entering correct user info and checking account value", async() => {
        await $("input[name='username']").setValue("aa");
        await $("input[name='password']").setValue("aa");
        await $("input[type='Submit']").click();

        const accountValue = await $("td.ng-binding");

        expect(await accountValue.getText()).toEqual("$1000,000.00");
    });
})
