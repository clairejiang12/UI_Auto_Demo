const { expect } = require('@playwright/test');

class Cart {
    constructor(page) {
        this.page = page;
    }

    #sectionData = {
        productNameInCart: 'tr: has(label.productName: has - text("$"))',
        cartTotalPriceItem: '*[@id="shoppingCart"]/table/tfoot/tr[1]/td[2]/span[2]',
    }



    async verifyItemsInCart(items) {
        let carTotalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            //verify color, quanityt and individual price correct
            let row = await this.page.locator(this.#sectionData.productNameInCart.replace('$', items[i].name));
            await expect(row.locator('label:has-text(" COLOR: ") ~ span')).toHaveAttribute('title', items[i].color);
            await expect(row.locator('label:has-text("QUANTITY") ~ label')).toHaveText(items[i].quantity.toString);
            let totalPrice = items[i].price * items[i].quantity;
            await expect(row.locator('label:has-text(" PRICE: ") ~ p')).toHaveText('$ ' + totalPrice.toString);
            carTotalPrice = carTotalPrice + totalPrice;
        }

        //verify total price is correct
        await expect(this.page.locator(this.#sectionData.cartTotalPriceItem)).toHaveText(carTotalPrice);
    }
}

module.exports = Cart;

