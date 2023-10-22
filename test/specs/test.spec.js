const { expect, browser, $ } = require('@wdio/globals')

describe("Test suite task one", () => {
    //Custom click function
    browser.addCommand("myClick", async function () {
        // `this` is return value of $(selector)
        await this.waitForDisplayed()
        await this.click()
    }, true)

    it("Loading home page of the application", async () => {
        await browser.url("https://the-internet.herokuapp.com/");
        const pageTitle = await browser.getTitle();

        expect(pageTitle).toEqual("The Internet");
    });


    it("Navigate to Add/remove Elements page", async () => {
        await $("//a[text()='Add/Remove Elements']").myClick();

        const pageUrl = await browser.getUrl();
        expect(pageUrl).toEqual("https://the-internet.herokuapp.com/add_remove_elements/");

    });

    it("Adding new element and checking if it was added to the page", async () => {
        await $("//button[text()='Add Element']").myClick();
        const addedManuallyButton = $('button.added-manually');
        const doesExist = addedManuallyButton.isExisting();
        expect(await doesExist).toBeTruthy();
    });

    it("Removing the previously added element", async () => {
        const addedManuallyButton = $('button.added-manually');
        await $("//button[text()='Delete']").myClick();
        const doesExist = addedManuallyButton.isExisting();
        expect(await doesExist).toBeFalsy();
    });
})

describe("Test suite task two", () => {

    browser.addCommand("myClick", async function () {
        // `this` is return value of $(selector)
        await this.waitForDisplayed()
        await this.click()
    }, true)

    it("Setting value of the input field Number", async () => {
        await browser.url("https://the-internet.herokuapp.com/inputs");
        await $("input[type='Number']").setValue("3");
        await $("input[type='Number']").setValue("5");
        await $("input[type='Number']").addValue("5");
        await $("input[type='Number']").addValue("a");

        const value = await $("input[type='Number']").getValue();
        expect(value).toEqual("55");
    });

    it("Checking if the hidden element exists but is not displayed", async () => {
        await browser.url("https://the-internet.herokuapp.com/dynamic_loading/1");
        const hiddenElement = await $("#finish h4");

        expect(await hiddenElement.isExisting()).toBeTruthy();
        expect(await hiddenElement.isDisplayed()).toBeFalsy();
    });

    it("Clicking on a button to display the hidden element", async () => {
        await (await $("#start button")).myClick();
        const hiddenElement = await $("#finish h4");

        await hiddenElement.waitForDisplayed({ // with params
            timeout: 10000,
            reverse: false,
            timeoutMsg: 'Desired element did not disappear',
            interval: 300
        })
        const isExisting = await hiddenElement.isExisting();
        const isHidden = await hiddenElement.isDisplayed()
        console.log(isExisting, isHidden);

        expect(isExisting).toBeTruthy();
        expect(isHidden).toBeTruthy();
    });

    it("Checking that the clicked checkbox is checked", async () => {
        await browser.url("https://the-internet.herokuapp.com/dynamic_controls");
        const checkboxElement = await $("input[type='checkbox']");;
        await (checkboxElement).myClick();
        const isChecked = await checkboxElement.isSelected();
        expect(isChecked).toBeTruthy();
    });

});
