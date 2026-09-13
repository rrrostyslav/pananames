import { LoadableComponent } from './abstract-classes.js';
import { HeaderComponent } from './components/header.component.js';

export abstract class BasePage extends LoadableComponent {
  protected abstract readonly pagePath: string;
  public readonly header = new HeaderComponent(this.page, this.page.locator('//header'));
  private readonly notification = this.page.locator('//body/div[2]');
  private readonly notificationCloseButton = this.notification.getByRole('button', { name: 'close' });
  async open(): Promise<void> {
    await this.page.goto(this.pagePath);
    await this.expectLoaded();
  }

  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  async reload(): Promise<void> {
    await this.page.reload();
    await this.expectLoaded();
  }

  async closeNotification(): Promise<void> {
    if (await this.notification.isVisible()) {
      await this.notificationCloseButton.click();
    }
  }
}
