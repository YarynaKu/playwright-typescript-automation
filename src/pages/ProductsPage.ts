import { Page, expect } from '@playwright/test';
import { sortOptions } from '../test-data/products';

type SortOption = keyof typeof sortOptions;

export class ProductsPage {
  private page: Page;
  private sortDropdown = '[data-test="product-sort-container"]';

  constructor(page: Page) {
    this.page = page;
  }

  private productNameLocator = '.inventory_item_name';
  private productPriceLocator = '.inventory_item_price';

  
  async expectProductsPage() {
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    const productLocator = this.page.locator(`#add-to-cart-${productName.toLowerCase().replace(/\s/g, '-')}`);
    await productLocator.click();
  }

  async expectProductAddedToCart(productName: string) {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  }

  async removeProductFromCart(productName: string) {
    const removeButtonLocator = this.page.locator(`#remove-${productName.toLowerCase().replace(/\s/g, '-')}`);
    await removeButtonLocator.click();
  }

  async expectProductRemovedFromCart() {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    await expect(cartBadge).not.toBeVisible();
  }

  async navigateToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async sortProducts(option: SortOption) {
    await this.page.selectOption(this.sortDropdown, option);
  }

  async expectProductsSorted(option: SortOption) {    
      if (option === 'az' || option === 'za') {
        const productNames = await this.page.locator(this.productNameLocator).allTextContents();
        const sortedNames = [...productNames].sort((a, b) => {
        return option === 'az' ? a.localeCompare(b) : b.localeCompare(a);
      });
      expect(productNames).toEqual(sortedNames);
    } else if (option === 'lohi' || option === 'hilo') {
      const priceStrings = await this.page.locator(this.productPriceLocator).allTextContents();
      const productPrices = priceStrings.map(price => parseFloat(price.replace('$', '')));
      const sortedPrices = [...productPrices].sort((a, b) => {
        return option === 'lohi' ? a - b : b - a;
      });
      expect(productPrices).toEqual(sortedPrices);
    }
}
}

