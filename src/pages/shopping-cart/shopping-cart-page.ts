import { expect } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { DomainTableComponent } from './components/table.component.js';

export class ShoppingCartPage extends BasePage {
  protected readonly pagePath = '/cart';
  private readonly totalPriceText = this.page.locator('//div[1]/div[2]/div[3]');
  private readonly tableLocator = this.page.locator('//table');
  public readonly table = new DomainTableComponent(this.page, this.tableLocator);

  async expectLoaded(): Promise<void> {
    await expect(this.totalPriceText, 'Shopping cart total price should be visible').toBeVisible();
  }

  async verifyTotalPrice(expectedPrice: number): Promise<void> {
    const actualPrice = await this.totalPriceText.textContent();
    const formattedActualPrice = Number(actualPrice?.match(/\d+(?:\.\d+)?/)?.[0]);

    expect(
      formattedActualPrice,
      `Total price does not match. Expected: ${expectedPrice}, Actual: ${formattedActualPrice}`,
    ).toBeCloseTo(expectedPrice, 2);
  }
}
