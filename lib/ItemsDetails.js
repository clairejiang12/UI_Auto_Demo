const { expect } = require('@playwright/test');

class DetailsPage {
    constructor(page) {
        this.page = page;
    }

    #sectionData = {
        speakerItem: '#speakersImg',
        searchButton: '#searchSection',
        searchInputBox: '#autoComplete',
        enter: 'Enter',
        productDetalName: 'a.productName:has-text("$")',
        colorSelect: 'span#rabbit[title = "$"]',
        addCartBtn: 'button[name="save_to_cart"]',
        addCartTip: '#toolTipCart',
        quantityInput: 'input[name="quantity"]',
        cartBtnInMenu: '#shoppingCartLink',
        shoppingCartPage: '#shoppingCart',
        productNameInCart: 'tr: has(label.productName: has - text("$"))',
        cartTotalPriceItem: '*[@id="shoppingCart"]/table/tfoot/tr[1]/td[2]/span[2]',
    }  

    async selectColor(color) {
        await expect(this.page.locator(this.#sectionData.colorSelect.replace('$', color))).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.colorSelect.replace('$', color)).click();
    }


    async inputQuantity(number) {
        await expect(this.page.locator(this.#sectionData.colorquantityInputSelect)).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.colorquantityInputSelect).fill(number.toString);
    }

    async addToCart() {
        await this.page.locator(this.#sectionData.addCartBtn).click();
        await expect(this.page.locator(this.#sectionData.addCartTip)).toBeVisible();
    }
}

module.exports = DetailsPage;

