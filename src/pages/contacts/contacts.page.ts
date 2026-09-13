import { expect } from '@playwright/test';
import { BasePage } from '../base.page.js';
import { ContactsTableComponent } from './components/table/table.component.js';
import { DeleteDialogComponent } from './components/delete-dialog.component.js';

export class ContactsPage extends BasePage {
  protected readonly pagePath = '/contacts';
  private readonly tableLocator = this.page.locator('//table');
  public readonly table = new ContactsTableComponent(this.page, this.tableLocator);
  private readonly deleteDialogLocator = this.page.locator('//div[2]/div[2]');
  public readonly deleteDialog = new DeleteDialogComponent(this.page, this.deleteDialogLocator);

  async expectLoaded(): Promise<void> {
    await expect(this.tableLocator, 'Contacts table should be visible').toBeVisible();
  }
}
