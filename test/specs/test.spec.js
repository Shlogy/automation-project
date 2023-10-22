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
<<<<<<< HEAD

describe("Test suite task three", () => {

    browser.addCommand("myClick", async function () {
        // `this` is return value of $(selector)
        await this.waitForDisplayed()
        await this.click()
    }, true)

    it("Execute test, changing border of an element", async () => {
        await browser.url("https://the-internet.herokuapp.com/forgot_password");
        const retrieveButton = await $('#form_submit');

        const result = await browser.execute((element) => {
            element.style.border = "2px solid red";
            if (element.style.border === "2px solid red") {
                return "Custom action executed successfully";
            } else {
                return "Failed to execute custom action";
            }

        }, retrieveButton);
        expect(result).toEqual("Custom action executed successfully");
    });

    it("waitUntil test, enabling text field", async () => {
        await browser.url("https://the-internet.herokuapp.com/dynamic_controls");
        await $("//button[text()='Enable']").myClick();
        const inputField = $("input[type='text']");
        await browser.waitUntil(

            async () => await $("#message").getText() === "It's enabled!",

            { timeout: 5000, interval: 600, timeoutMsg: "not enabled" }

        );
        const isEnabled = await inputField.isEnabled();
        expect(isEnabled).toEqual(true);

    });

    it("waitUntil test, enabling text field", async () => {
        await browser.url("https://the-internet.herokuapp.com/dropdown");
        await $('#dropdown').myClick();
        //await browser.keys(['ArrowDown', 'Enter']); This one can also be used instead of performActions, I just didn't know which one you will accept
        await browser.performActions([
            {
                type: 'key',
                id: 'keyboard',
                actions: [
                    { type: 'keyDown', value: '\uE015' }, // ArrowDown
                    { type: 'keyUp', value: '\uE015' }, // ArrowDown
                    { type: 'keyDown', value: '\uE007' }, // Enter
                    { type: 'keyUp', value: '\uE007' } // Enter
                ]
            }
        ]);
        const option = await $("//option[@value='1']");
        const isSelected = await option.isSelected();
        expect(isSelected).toEqual(true);
    });
});
