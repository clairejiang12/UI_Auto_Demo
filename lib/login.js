const { expect } = require('@playwright/test');

class Login {
    constructor(page) {
        this.page = page;
    }

    #sectionData = {
        loding: '#loader',
        loadingStyle: 'display: block; opacity: 1;',
        notLoadingStyle: 'display: none; opacity: 0;'
    }

    #baseURL = 'https://www.advantageonlineshopping.com/';

    async connectURL() {
        await this.page.goto(this.#baseURL);
        await this.page.waitForTimeout(10000);
    }

    async waitForPageLoding() {
        await expect(this.page.locator(this.#sectionData.loding).first()).toHaveAttribute('style', /display: block/, { timeout: 1000000 });
        await expect(this.page.locator(this.#sectionData.loding).first()).toHaveAttribute('style', /display: none/, { timeout: 1000000 });
    }


}

module.exports = Login;

