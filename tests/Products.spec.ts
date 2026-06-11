import { test, expect } from '@playwright/test';
import { ProductsPage } from '../src/pages/ProductsPage.ts';
import { LoginPage } from '../src/pages/LoginPage.ts';
import { standardUser } from '../src/test-data/users.ts';

test.describe.only('Products Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.navigate();
    });
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(standardUser.username, standardUser.password);
    });
    await test.step('Verify successful login', async () => {
      await loginPage.expectLoginSuccess();
    });
  })

    test('Add product to cart and verify', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await test.step('Expect products page to be displayed', async () => {
            await productsPage.expectProductsPage();
        });

        await test.step('Add product to cart', async () => {
            await productsPage.addProductToCart('Sauce Labs Backpack');
        });

        await test.step('Verify product added to cart', async () => {
            await productsPage.expectProductAddedToCart('Sauce Labs Backpack');
        });
    })

    test('Remove product from cart and verify', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await test.step('Expect products page to be displayed', async () => {
            await productsPage.expectProductsPage();
        });

        await test.step('Add product to cart', async () => {
            await productsPage.addProductToCart('Sauce Labs Backpack');
        });

        await test.step('Remove product from cart', async () => {
            await productsPage.removeProductFromCart('Sauce Labs Backpack');
        });

        await test.step('Verify product removed from cart', async () => {
            await productsPage.expectProductRemovedFromCart();
        });
    })

    test('Sort products and verify', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await test.step('Expect products page to be displayed', async () => {
            await productsPage.expectProductsPage();
        });

        await test.step('Sort products A-Z', async () => {
            await productsPage.sortProducts('az');
        });

        await test.step('Verify products sorted A-Z', async () => {
            await productsPage.expectProductsSorted('az');
        });
    })

})  

