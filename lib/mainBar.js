const { expect } = require('@playwright/test');
const Login = require('./login');

class MainBar {
    constructor(page) {
        this.page = page;
        this.login = new Login(page);
    }

    #sectionData = {
        searchButton: '#searchSection',
        searchInputBox: '#autoComplete',
        enter: 'Enter',
        productDetalName: '#searchPage a.productName:has-text("$")',
        closeSearchBtn: '//*[@id="search"]/div/div ',
        cartBtnInMenu: '#shoppingCartLink',
        shoppingCartPage: '#shoppingCart',
        searchResultDropDown: '//*[@id="output"]'
    }

    async searchItemAndGoToDetailsPage(itemName) {
        await this.page.locator(this.#sectionData.searchButton).click();
        await expect(this.page.locator(this.#sectionData.searchInputBox)).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.searchInputBox).fill(itemName);
        await this.page.keyboard.press(this.#sectionData.enter);
        await this.page.waitForTimeout(20000);
        await this.page.locator(this.#sectionData.searchButton).locator(this.#sectionData.closeSearchBtn).click();
        await expect(this.page.locator(this.#sectionData.searchResultDropDown)).not.toBeVisible({ timeout: 100000 });
        await this.page.waitForTimeout(3000);
        await expect(this.page.locator(this.#sectionData.productDetalName.replace('$', itemName))).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.productDetalName.replace('$', itemName)).click();
    }


    async openCart() {
        await this.page.locator(this.#sectionData.cartBtnInMenu).click();
        await expect(this.page.locator(this.#sectionData.shoppingCartPage)).toBeVisible({ timeout: 100000 });
    }

}

module.exports = MainBar;
