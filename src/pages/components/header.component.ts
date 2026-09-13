import { Component } from '../abstract-classes.js';
import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderComponent extends Component {
  constructor(
    protected page: Page,
    protected readonly root: Locator,
  ) {
    super(page);
  }
  private readonly basketButton = this.root.locator('//div[1]/nav/div/div[3]');

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Page header should be visible').toBeVisible();
  }

  async clickBasketButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/templates/dns/get-list') && res.status() === 200),
      this.basketButton.click(),
    ]);
  }
}
