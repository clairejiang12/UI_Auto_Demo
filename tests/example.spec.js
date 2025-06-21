// @ts-check
import { test, expect } from '@playwright/test';
const Actions = require('../actions/action');



test.describe.serial('API Automation DEMO', () => {


    let page;
    let actions;
    let itemDetails = [
        { name: 'HP ZBOOK 17 G2 MOBILE WORKSTATION', color: 'GRAY', quantity: 1, price: 1799.00 },
        { name: 'HP Z8000 BLUETOOTH MOUSE', color: 'BLACK', quantity: 2, price: 50.99 },
        { name: 'HP ELITE X2 1011 G1 TABLET', color: 'BLACK', quantity: 1, price: 1279.00 },
    ]


    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        actions = new Actions(page);
    });


    test('Open Home Page', async ({ }) => {
        await actions.connectURL('https://www.advantageonlineshopping.com/');
    });

    test('Search and add first item - HP ZBOOK 17 G2 MOBILE WORKSTATION', async ({  }) => {
        await actions.searchItemAndGoToDetailsPage(itemDetails[0].name);
        await actions.selectColor(itemDetails[0].color);
        await actions.addToCart();
    });

    test('Search and add second item - HP Z8000 BLUETOOTH MOUSE', async ({ }) => {
        await actions.searchItemAndGoToDetailsPage(itemDetails[1].name);
        await actions.selectColor(itemDetails[1].color);
        await actions.inputQuantity(itemDetails[1].quantity);
        await actions.addToCart();
    });

    test('Search and add third item - HP ELITE X2 1011 G1 TABLET', async ({ }) => {
        await actions.searchItemAndGoToDetailsPage(itemDetails[2].name);
        await actions.selectColor(itemDetails[2].color);
        await actions.addToCart();
    });


    test('Go to shopping cart and check result', async ({ }) => {
        await actions.openCart();
        await actions.verifyItemsInCart(itemDetails);
    });
});