import { expect } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { BaseInputComponent } from '../components/base-input.component.js';
import { DomainTableComponent } from './components/table.component.js';

export class RegisterDomainPage extends BasePage {
  protected readonly pagePath = '/register-domain';
  private readonly domainInputLocator = this.page.locator('//fieldset/div/div/div[1]/input');
  public readonly domainInput = new BaseInputComponent(this.domainInputLocator, this.page, 'Domain');
  private readonly tableLocator = this.page.locator('//body/div/div[1]/div[3]/div/div[2]');
  public readonly table = new DomainTableComponent(this.page, this.tableLocator);

  async expectLoaded(): Promise<void> {
    await expect(this.domainInputLocator, 'Domain search input should be visible').toBeVisible();
  }

  async searchDomain(domain: string): Promise<void> {
    await this.domainInput.fill(domain);
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/price') && res.status() === 200),
      this.domainInputLocator.press('Enter'),
    ]);
  }
}
