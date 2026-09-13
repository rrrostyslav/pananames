import { Component } from '../../abstract-classes.js';
import { expect, type Locator, type Page } from '@playwright/test';

export class DomainRowComponent extends Component {
  constructor(
    protected page: Page,
    protected readonly root: Locator,
  ) {
    super(page);
  }
  private readonly priceCell = this.root.locator('span.text-right.text-gray-900');
  private readonly addToCartButton = this.root.locator('button:has-text("Add to cart")');

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Domain result row should be visible').toBeVisible();
  }

  async getPrice(): Promise<number> {
    const text = await this.priceCell.textContent();
    const prices = text?.match(/\d+(?:\.\d+)?/g);
    const currentPrice = prices?.at(-1);

    expect(currentPrice, 'Domain price should be displayed').toBeTruthy();

    return Number(currentPrice);
  }

  async clickAddToCart(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('cart-domain-registered-list') && res.status() === 200),
      this.addToCartButton.click(),
    ]);
  }
}
