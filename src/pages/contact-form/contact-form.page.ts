import { expect } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { type ContactDto } from '../../types/contactData.types.js';
import { BaseInputComponent } from '../components/base-input.component.js';
import { BaseDropdownComponent } from '../components/base-dropdown.component.js';
import { BaseCheckboxComponent } from '../components/base-checkbox.component.js';

export class ContactFormPage extends BasePage {
  protected readonly pagePath = '/contacts/add';
  private readonly contactTypeInputLocator = this.page.locator('//form/div[1]/div/div/fieldset/div/div/div[1]/input');
  public readonly contactTypeInput = new BaseInputComponent(this.contactTypeInputLocator, this.page, 'Contact Type');
  private readonly firstNameInputLocator = this.page.locator('//form/div[2]/div[1]/div/fieldset/div/div/div[1]/input');
  public readonly firstNameInput = new BaseInputComponent(this.firstNameInputLocator, this.page, 'First Name');
  private readonly lastNameInputLocator = this.page.locator('//form/div[2]/div[2]/div/fieldset/div/div/div[1]/input');
  public readonly lastNameInput = new BaseInputComponent(this.lastNameInputLocator, this.page, 'Last Name');
  private readonly emailInputLocator = this.page.locator('//form/div[3]/div/div/fieldset/div/div/div[1]/input');
  public readonly emailInput = new BaseInputComponent(this.emailInputLocator, this.page, 'Email');
  private readonly phonePrefixInputLocator = this.page.locator('//form/div[4]/div[1]/div/div[1]/input');
  private readonly phonePrefixListItemLocator = this.page.locator('//form/div[4]/div[1]/div/div[2]/ul/li');
  public readonly phonePrefixDropdown = new BaseDropdownComponent(
    this.phonePrefixInputLocator,
    this.phonePrefixListItemLocator,
    this.page,
    'Phone Prefix',
  );
  private readonly phoneNumberInputLocator = this.page.locator(
    '//form/div[4]/div[2]/div/fieldset/div/div/div[1]/input',
  );
  public readonly phoneNumberInput = new BaseInputComponent(this.phoneNumberInputLocator, this.page, 'Phone Number');
  private readonly commentInputLocator = this.page.locator('//form/div[5]/div/div/fieldset/div/div/div[1]/input');
  public readonly commentInput = new BaseInputComponent(this.commentInputLocator, this.page, 'Comment');
  private readonly allowSupportRequestsCheckboxLocator = this.page.locator('//form/div[6]/div/div/div');
  public readonly allowSupportRequestsCheckbox = new BaseCheckboxComponent(
    this.allowSupportRequestsCheckboxLocator,
    this.page,
    'Allow Support Requests',
  );
  private readonly createButton = this.page.locator('//form/div/div/div[2]/form/button');
  private readonly saveButton = this.page.locator('//form/div/div/div[2]/form/button');

  async expectLoaded(): Promise<void> {
    await expect(this.contactTypeInputLocator, 'Contact form should be visible').toBeVisible();
  }

  async clickCreateButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/contacts/store') && res.status() === 200),
      this.page.waitForResponse((res) => res.url().includes('/contacts?per_page') && res.status() === 200),
      this.createButton.click(),
    ]);
  }

  async clickSaveButton(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse((res) => res.url().includes('/contacts/store') && res.status() === 200),
      this.page.waitForResponse((res) => res.url().includes('/contacts?per_page') && res.status() === 200),
      this.saveButton.click(),
    ]);
  }

  async fillModal(data: ContactDto): Promise<void> {
    if (data.contactType !== undefined) await this.contactTypeInput.fill(data.contactType);
    if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.email !== undefined) await this.emailInput.fill(data.email);
    if (data.phonePrefix !== undefined) await this.phonePrefixDropdown.selectOption(data.phonePrefix);
    if (data.phoneNumber !== undefined) await this.phoneNumberInput.fill(data.phoneNumber);
    if (data.comment !== undefined) await this.commentInput.fill(data.comment);
    if (data.allowSupportRequests !== undefined)
      await this.allowSupportRequestsCheckbox.setCheckbox(data.allowSupportRequests);
  }

  async verifyModal(data: ContactDto): Promise<void> {
    if (data.contactType !== undefined) await this.contactTypeInput.verifyValue(data.contactType);
    if (data.firstName !== undefined) await this.firstNameInput.verifyValue(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.verifyValue(data.lastName);
    if (data.email !== undefined) await this.emailInput.verifyValue(data.email);
    if (data.phonePrefix !== undefined) await this.phonePrefixDropdown.verifyInputValue(data.phonePrefix);
    if (data.phoneNumber !== undefined) await this.phoneNumberInput.verifyValue(data.phoneNumber);
    if (data.comment !== undefined) await this.commentInput.verifyValue(data.comment);
    if (data.allowSupportRequests !== undefined)
      await this.allowSupportRequestsCheckbox.verifyCheckbox(data.allowSupportRequests);
  }
}
