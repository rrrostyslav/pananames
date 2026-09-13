import { type Locator, type Page, expect } from '@playwright/test';
import { Component } from '../../../abstract-classes.js';
import { ContactRowComponent } from './rows.component.js';

export class ContactsTableComponent extends Component {
  constructor(
    protected page: Page,
    protected readonly root: Locator,
  ) {
    super(page);
  }
  private readonly rows = this.root.locator('//tr');

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Contacts table should be visible').toBeVisible();
  }

  async getRowByName(name: string): Promise<ContactRowComponent> {
    const row = this.rows.filter({
      has: this.page.locator('td:first-child').filter({ hasText: name }),
    });
    await expect(row, `Contact row with name "${name}" should exist`).toHaveCount(1);

    return new ContactRowComponent(this.page, row);
  }

  async verifyRowNotPresent(name: string): Promise<void> {
    const row = this.rows.filter({ hasText: name });
    await expect(row, `Contact row with name "${name}" should not exist`).toHaveCount(0);
  }
}
