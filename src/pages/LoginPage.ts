import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async expectLoginSuccess() {
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
  }

  async expectLoginFailure() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }
}