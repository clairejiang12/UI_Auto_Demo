// @ts-check
import { test } from '@playwright/test';
const Login = require('../lib/login');
const Cart = require('../lib/cart');
const LogDetailsPagein = require('../lib/ItemsDetails');
const MainBar = require('../lib/mainBar');


test.describe.serial('API Automation DEMO', () => {


    let page;
    let login;
    let cart;
    let details;
    let mainBar;
    let itemDetails = [
        { name: 'HP ZBOOK 17 G2 MOBILE WORKSTATION', color: 'GRAY', quantity: 1, price: 1799.00 },
        { name: 'HP Z8000 BLUETOOTH MOUSE', color: 'BLACK', quantity: 2, price: 50.99 },
        { name: 'HP ELITE X2 1011 G1 TABLET', color: 'BLACK', quantity: 1, price: 1279.00 },
    ]


    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        login = new Login(page);
        cart = new Cart(page);
        details = new LogDetailsPagein(page);
        mainBar = new MainBar(page);
    });


    test('Open Home Page', async ({ }) => {
        await login.connectURL();
    });

    test('Search and add first item - HP ZBOOK 17 G2 MOBILE WORKSTATION', async ({  }) => {
        await mainBar.searchItemAndGoToDetailsPage(itemDetails[0].name);
        await details.selectColor(itemDetails[0].color);
        await details.addToCart();
    });

    test('Search and add second item - HP Z8000 BLUETOOTH MOUSE', async ({ }) => {
        await mainBar.searchItemAndGoToDetailsPage(itemDetails[1].name);
        await details.selectColor(itemDetails[1].color);
        await details.inputQuantity(itemDetails[1].quantity);
        await details.addToCart();
    });

    test('Search and add third item - HP ELITE X2 1011 G1 TABLET', async ({ }) => {
        await mainBar.searchItemAndGoToDetailsPage(itemDetails[2].name);
        await details.selectColor(itemDetails[2].color);
        await details.addToCart();
    });


    test('Go to shopping cart and check result', async ({ }) => {
        await mainBar.openCart();
        await cart.verifyItemsInCart(itemDetails);
    });
});