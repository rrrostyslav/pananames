import type { Locator, Page } from '@playwright/test';

export abstract class PageHolder {
  constructor(protected page: Page) {}
}

export abstract class LoadableComponent extends PageHolder {
  abstract expectLoaded(): Promise<void>;
}

export abstract class Component extends LoadableComponent {
  protected readonly baseLocator?: Locator;
}
