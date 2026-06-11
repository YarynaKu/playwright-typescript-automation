import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.ts';
import { standardUser } from '../src/test-data/users.ts';

test('Login Tests', async ({ page }) => {

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

});