import { type Locator, type Page, expect } from '@playwright/test';
import { Component } from '../../abstract-classes.js';
import { DomainRowComponent } from './row.component.js';

export class DomainTableComponent extends Component {
  constructor(
    protected page: Page,
    protected readonly root: Locator,
  ) {
    super(page);
  }
  private readonly rows = this.root.getByRole('listitem');
  private readonly availableRows = this.rows.filter({
    has: this.page.locator('button:has-text("Add to cart")'),
  });

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Domain search results should be visible').toBeVisible();
  }

  async getAvailableRowByIndex(index: number): Promise<DomainRowComponent> {
    const row = this.availableRows.nth(index);
    await expect(row, 'At least one domain should be available to add').toBeVisible();

    return new DomainRowComponent(this.page, row);
  }
}
