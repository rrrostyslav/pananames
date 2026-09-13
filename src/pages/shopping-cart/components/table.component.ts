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
  private readonly rows = this.root.locator('//tbody//tr');

  async expectLoaded(): Promise<void> {
    await expect(this.root, 'Shopping cart table should be visible').toBeVisible();
  }

  async getRowByIndex(index: number): Promise<DomainRowComponent> {
    const row = this.rows.nth(index);
    return new DomainRowComponent(this.page, row);
  }
}
