const { expect } = require('@playwright/test');

class Login {
    constructor(page) {
        this.page = page;
    }

    #sectionData = {
        speakerItem: '#speakersImg'
    }

    #baseURL = 'https://www.advantageonlineshopping.com/';

    async connectURL(url = this.#baseURL) {
        await this.page.goto(url);
        await expect(this.page.locator(this.#sectionData.speakerItem)).toBeVisible({ timeout: 100000 });
    }

}

module.exports = Login;

