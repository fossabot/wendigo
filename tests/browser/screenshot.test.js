"use strict";

const assert = require('assert');
const Wendigo = require('../..');
const configUrls = require('../config.json').urls;

describe("Screenshot", function() {
    this.timeout(5000);

    let browser;
    before(async() => {
        browser = await Wendigo.createBrowser();
    });

    beforeEach(async() => {
        await browser.open(configUrls.index);
    });

    after(async() => {
        await browser.close();
    });

    it("Base64 Screenshot", async() => {
        const res = await browser.screenshot({
            encoding: "base64"
        });
        assert.ok(res.length > 100);
    });
});
