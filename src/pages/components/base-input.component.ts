import { Component } from '../abstract-classes.js';
import { expect, type Locator, type Page } from '@playwright/test';

export class BaseInputComponent extends Component {
  constructor(
    private root: Locator,
    page: Page,
    protected readonly name: string,
  ) {
    super(page);
  }
  async expectLoaded(): Promise<void> {
    await expect(this.root, `Input "${this.name}" should be visible`).toBeVisible();
  }

  async fill(value: string | number): Promise<void> {
    await this.root.fill(value.toString());
    await this.root.blur();
    await this.verifyValue(value);
  }

  async verifyValue(value: string | number): Promise<void> {
    const expectedValue = value.toString();
    await expect
      .soft(this.root, `Input "${this.name}" should have value: "${expectedValue}"`)
      .toHaveValue(expectedValue);
  }
}
