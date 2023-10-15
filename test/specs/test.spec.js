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

    it("Loading home page of the application", async () => {
    await browser.url("https://the-internet.herokuapp.com/");
    const pageTitle = await browser.getTitle();

    expect(pageTitle).toEqual("The Internet");
    });

    
    it("Navigate to Add/remove Elements page", async() => {
        await $("//a[text()='Add/Remove Elements']").click();
        
        const pageUrl = await browser.getUrl();
        expect(pageUrl).toEqual("https://the-internet.herokuapp.com/add_remove_elements/");

    });
    
    it("Adding new element and checking if it was added to the page", async() => {
        await $("//button[text()='Add Element']").click();
        const addedManuallyButton = $('button.added-manually');
        const doesExist = addedManuallyButton.isExisting();
        expect(doesExist).toBeTruthy();
    });

    it("Removing the previously added element", async() => {
        const addedManuallyButton = $('button.added-manually');
        await $("//button[text()='Delete']").click();
        const doesExist = addedManuallyButton.isExisting();
        expect(await doesExist).toBeFalsy();
    });
 })
