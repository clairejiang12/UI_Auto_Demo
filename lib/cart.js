const { expect } = require('@playwright/test');

class Cart {
    constructor(page) {
        this.page = page;
    }

    #sectionData = {
        productNameInCart: 'label',
        colorColumn: '//td[4]/span',
        quantityColumn: '//td[5]/label[2]',
        priceColumn: '//td[6]/p',
        cartTotalPriceItem: '*[@id="shoppingCart"]/table/tfoot/tr[1]/td[2]/span[2]',
        header: 'header',
        addCartTip: '#toolTipCart'

    }


    async formatAmount(amount) {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    async verifyItemsInCart(items) {
        let carTotalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            //verify color, quanityt and individual price correct
            let row = this.page.locator(this.#sectionData.productNameInCart).filter({ hasText: items[i].name }).locator('..').locator('..');
            await this.row.click({ force: true });
            await expect(this.page.locator(this.#sectionData.header).locator(this.#sectionData.addCartTip)).not.toBeVisible({ timeout: 100000 });

            //let row = this.page.locator(this.#sectionData.productNameInCart.replace('$', items[i].name)).locator('..').locator('..');
            await expect(row.locator(this.#sectionData.colorColumn)).toHaveAttribute('title', items[i].color);
            await expect(row.locator(this.#sectionData.quantityColumn)).toHaveText(items[i].quantity.toString());
            let totalPrice = items[i].price * items[i].quantity;
            let formatPrice = await this.formatAmount(totalPrice);
            await expect(row.locator(this.#sectionData.priceColumn)).toHaveText(' $ ' + formatPrice + ' ');
            carTotalPrice = carTotalPrice + totalPrice;
        }

        //verify total price is correct
        await expect(this.page.locator(this.#sectionData.cartTotalPriceItem)).toHaveText(carTotalPrice);
    }
}

module.exports = Cart;

