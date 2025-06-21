const { expect } = require('@playwright/test');

class MainBar {
    constructor(page) {
        this.page = page;
    }

    #sectionData = {
        searchButton: '#searchSection',
        searchInputBox: '#autoComplete',
        enter: 'Enter',
        productDetalName: 'a.productName:has-text("$")',
        cartBtnInMenu: '#shoppingCartLink',
        shoppingCartPage: '#shoppingCart',
   
    }

    async searchItemAndGoToDetailsPage(itemName) {
        await this.page.locator(this.#sectionData.searchButton).click();
        await expect(this.page.locator(this.#sectionData.searchInputBox)).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.searchInputBox).fill(itemName);
        await this.page.keyboard.press(this.#sectionData.enter);
        await expect(this.page.locator(this.#sectionData.productDetalName.replace('$', itemName))).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.productDetalName.replace('$', itemName)).click();
    }


    async openCart() {
        await this.page.locator(this.#sectionData.cartBtnInMenu).click();
        await expect(this.page.locator(this.#sectionData.shoppingCartPage)).toBeVisible();
    }

}

module.exports = MainBar;
