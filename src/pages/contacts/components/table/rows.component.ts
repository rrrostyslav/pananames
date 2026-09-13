import { Component } from '../../../abstract-classes.js';
import { expect, type Locator, type Page } from '@playwright/test';

export class ContactRowComponent extends Component {
  constructor(
    protected page: Page,
    protected readonly root: Locator,
  ) {
    super(page);
  }
  private readonly editButton = this.root.locator('//td[3]/button');
  private readonly deleteButton = this.root.locator('//td[4]/button');

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Contact row should be visible').toBeVisible();
  }

  async clickEditButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/contacts') && res.status() === 200),
      this.editButton.click(),
    ]);
  }

  async clickDeleteButton(): Promise<void> {
    await this.expectLoaded();
    await this.deleteButton.click();
  }
}
