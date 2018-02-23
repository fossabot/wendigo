"use strict";

const Wendigo = require('../../lib/wendigo');
const configUrls = require('../config.json').urls;

describe("Input", function() {
    this.timeout(5000);
    let browser;

    before(async () => {
        browser = await Wendigo.createBrowser();
    });

    beforeEach(async() => {
        await browser.open(configUrls.forms);
    });

    after(async() => {
        await browser.close();
    });

    it("Type", async () => {
        await browser.type("input.input1", "firstText");
        await browser.assert.value("input.input1", "firstText");
    });
    it("Type With Existing Text", async () => {
        await browser.type("input.input2", "secondText");
        await browser.assert.value("input.input2", "secondTextdefault value");
    });

    it("Type Multiple Elements", async () => {
        await browser.type("input", "firstText");
        await browser.assert.value("input.input1", "firstText");
        await browser.assert.value("input.input2", "default value");
    });

    it("Type Node", async () => {
        const node = await browser.query("input.input1");

        await browser.type(node, "firstText");
        await browser.assert.value("input.input1", "firstText");
    });

    it("Clear Input", async() => {
        await browser.clearValue("input.input1");
        await browser.clearValue("input.input2");
        await browser.assert.value("input.input1", "");
        await browser.assert.value("input.input2", "");
    });

    it("Clear Input From Node", async() => {
        const node = await browser.query("input.input2");
        await browser.clearValue(node);
        await browser.assert.value("input.input2", "");
    });

    it("Type With Keypress Event", async() => {
        await browser.type(".input1", "dontpanic");
        await browser.assert.text("#value-input", "c");
    });

});