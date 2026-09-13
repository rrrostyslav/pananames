import { Component } from '../../abstract-classes.js';
import { expect, type Locator, type Page } from '@playwright/test';

export class DomainRowComponent extends Component {
  constructor(
    protected page: Page,
    protected readonly root: Locator,
  ) {
    super(page);
  }
  private readonly deleteButton = this.root.locator('//td[8]/button');

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Shopping cart domain row should be visible').toBeVisible();
  }

  async clickDeleteButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/cart/remove/') && res.status() === 200),
      this.deleteButton.click(),
    ]);
  }
}
