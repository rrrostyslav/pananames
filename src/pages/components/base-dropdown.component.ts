import { expect, type Locator, type Page } from '@playwright/test';
import { Component } from '../abstract-classes.js';

export class BaseDropdownComponent extends Component {
  constructor(
    protected inputLocator: Locator,
    protected selectLocator: Locator,
    page: Page,
    protected name: string,
  ) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.inputLocator, `Dropdown "${this.name}" should be visible`).toBeVisible();
  }

  async selectOption(option: string): Promise<void> {
    await this.inputLocator.click();
    await this.selectLocator.filter({ hasText: option }).click();
  }

  async verifyInputValue(option: string): Promise<void> {
    const inputValue = await this.inputLocator.locator('xpath=following-sibling::label[1]').textContent();
    expect(inputValue, `Dropdown "${this.name}" should have value "${option}"`).toContain(option);
  }
}
