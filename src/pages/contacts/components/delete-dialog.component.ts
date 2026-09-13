import { Component } from '../../abstract-classes.js';
import { expect, type Locator, type Page } from '@playwright/test';

export class DeleteDialogComponent extends Component {
  constructor(
    protected page: Page,
    protected readonly root: Locator,
  ) {
    super(page);
  }
  private readonly deleteButton = this.root.locator('//div/div[3]/button[2]');

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Delete contact dialog should be visible').toBeVisible();
  }

  async clickDeleteButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/contacts/remove') && res.status() === 200),
      this.page.waitForResponse((res) => res.url().includes('/contacts?per_page') && res.status() === 200),
      this.deleteButton.click(),
    ]);
  }
}
