const { expect } = require('@playwright/test');

class Actions {
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
 

    async connectURL(url) {
        await this.page.goto(url);
        await expect(this.page.locator(this.#sectionData.speakerItem)).toBeVisible({ timeout: 100000 });
    }

    async searchItemAndGoToDetailsPage(itemName) {
        await this.page.locator(this.#sectionData.searchButton).click();
        await expect(this.page.locator(this.#sectionData.searchInputBox)).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.searchInputBox).fill(itemName);
        await this.page.keyboard.press(this.#sectionData.enter);
        await expect(this.page.locator(this.#sectionData.productDetalName.replace('$', itemName))).toBeVisible({ timeout: 100000 });
        await this.page.locator(this.#sectionData.productDetalName.replace('$', itemName)).click();
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


    async openCart() {
        await this.page.locator(this.#sectionData.cartBtnInMenu).click();
        await expect(this.page.locator(this.#sectionData.shoppingCartPage)).toBeVisible();
    }

    async verifyItemsInCart(items) {
        let carTotalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            //verify color, quanityt and individual price correct
            let row = await this.page.locator(this.#sectionData.productNameInCart.replace('$', items[i].name));
            await expect(row.locator('label:has-text(" COLOR: ") ~ span')).toHaveAttribute('title', items[i].color);
            await expect(row.locator('label:has-text("QUANTITY") ~ label')).toHaveText(items[i].quantity.toString);
            let totalPrice = items[i].price * items[i].quantity;
            await expect(row.locator('label:has-text(" PRICE: ") ~ p')).toHaveText('$ '+totalPrice.toString);
            carTotalPrice = carTotalPrice + totalPrice;
        }

        //verify total price is correct
        await expect(this.page.locator(this.#sectionData.cartTotalPriceItem)).toHaveText(carTotalPrice);
    }
}

module.exports = Actions;

