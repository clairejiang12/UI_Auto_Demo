# Advantage Online Shopping Automated Test Project via Playwright

## Project Introduction

This project is an automated end-to-end testing suite for the [Advantage Online Shopping](https://www.advantageonlineshopping.com/) website, built using [Playwright](https://playwright.dev/).  
It covers core e-commerce flows such as product search, product details, cart operations, and login verification to ensure the stability and correctness of the main business functions.

**Main Features Covered:**
- Product search and navigation to details page
- Color and quantity selection
- Add to cart and cart content verification
- Price and quantity validation in the cart
- Page loading and login checks

## Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## How to Execute

1. **Install dependencies**
   In the project root directory, run: ``npm install``

2. **Run all tests and view report**
   Headless mode
   ``npx playwright test``
   Debug mode
    ``npx playwright test --debug``
   GUI mode
    ``npx playwright test --ui``

## Project Structure

- `lib/` ¡ª Business logic modules (cart, product details, login, etc.)
- `tests/` ¡ª Playwright test cases
- `package.json` ¡ª Project dependencies and scripts

## Notes

- You can extend or modify the test cases as needed.
- Recommended to use Visual Studio Code or Visual Studio 2022 for development and debugging.

---

For any questions, please open an issue or contact the maintainer.