import { expect } from '@playwright/test';
import { BasePage } from '../base.page.js';

export class LoginPage extends BasePage {
  protected readonly pagePath = '/login';
  public readonly emailInput = this.page.locator('//form/div/div/div[1]/div[1]/div/fieldset/div[1]/div/div[1]/input');
  public readonly passwordInput = this.page.locator('//form/div/div/div[1]/div[2]/div/fieldset/div/div/div[1]/input');
  public readonly loginButton = this.page.locator('//form/div/div/div[2]/button');

  async expectLoaded(): Promise<void> {
    await expect(this.emailInput, 'Login email input should be visible').toBeVisible();
  }

  async fillForm(email: string, password: string): Promise<void> {
    await this.expectLoaded();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.clickLoginButton();
  }

  async clickLoginButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/domains/list-totals') && res.status() === 200),
      this.loginButton.click(),
    ]);
  }
}
