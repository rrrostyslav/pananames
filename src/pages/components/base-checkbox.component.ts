import { expect, type Locator, type Page } from '@playwright/test';
import { Component } from '../abstract-classes.js';

export class BaseCheckboxComponent extends Component {
  constructor(
    protected checkboxLocator: Locator,
    page: Page,
    protected name: string,
  ) {
    super(page);
  }
  private readonly checkboxInput = this.checkboxLocator.locator('input[type="checkbox"]');

  async expectLoaded(): Promise<void> {
    await expect(this.checkboxLocator, `Checkbox "${this.name}" should be visible`).toBeVisible();
  }

  async setCheckbox(checked: boolean): Promise<void> {
    const isChecked = await this.checkboxInput.isChecked();

    if (isChecked !== checked) {
      await this.checkboxLocator.click();
    }
  }

  async verifyCheckbox(checked: boolean): Promise<void> {
    await expect(this.checkboxInput, `Checkbox "${this.name}" should be ${checked}`).toBeChecked({
      checked,
    });
  }
}
