const { expect } = require('@playwright/test');

class DetailsPage {
    constructor(page) {
        this.page = page;
    }

    #sectionData = {
        colorSelect: 'span#rabbit[title = "$"]',
        addCartBtn: 'button[name="save_to_cart"]',
        addCartTip: '#toolTipCart',
        quantityInput: 'input[name="quantity"]',
        header: 'header'
    }  

    async selectColor(color) {
        await expect(this.page.locator(this.#sectionData.colorSelect.replace('$', color))).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.colorSelect.replace('$', color)).click();
    }


    async inputQuantity(number) {
        await expect(this.page.locator(this.#sectionData.quantityInput)).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.quantityInput).fill(number.toString());
    }

    async addToCart() {
        await this.page.locator(this.#sectionData.addCartBtn).click();
        await expect(this.page.locator(this.#sectionData.header).locator(this.#sectionData.addCartTip)).toBeVisible();
        //await expect(this.page.locator(this.#sectionData.header).locator(this.#sectionData.addCartTip)).not.toBeVisible({ timeout: 30000 });
    }
}

module.exports = DetailsPage;

