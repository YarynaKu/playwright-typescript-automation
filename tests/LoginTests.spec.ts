import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.ts';
import { standardUser, lockedUser } from '../src/test-data/users.ts';

test.describe('Login Tests', () => {
    
        test('Successful login with valid credentials', async ({ page }) => {
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

        test('Failed login with locked out user credentials', async ({ page }) => {
            const loginPage = new LoginPage(page);
            await test.step('Navigate to login page', async () => {
                await loginPage.navigate();
            });

            await test.step('Login with locked out user credentials', async () => {
                await loginPage.login(lockedUser.username, lockedUser.password);
            });

            await test.step('Verify login failure', async () => {
                await loginPage.expectLoginFailure();
            });
        })

});