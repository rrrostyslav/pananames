import { test as base } from '@playwright/test';
import { ContactsPage } from '../pages/contacts/contacts.page.js';
import { ContactFormPage } from '../pages/contact-form/contact-form.page.js';
import { RegisterDomainPage } from '../pages/register-domain/register-domain.page.js';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart-page.js';

type BaseFixture = {
  contactsPage: ContactsPage;
  contactFormPage: ContactFormPage;
  registerDomainPage: RegisterDomainPage;
  shoppingCartPage: ShoppingCartPage;
};

export const test = base.extend<BaseFixture>({
  contactsPage: async ({ page }, use) => {
    await use(new ContactsPage(page));
  },
  contactFormPage: async ({ page }, use) => {
    await use(new ContactFormPage(page));
  },
  registerDomainPage: async ({ page }, use) => {
    await use(new RegisterDomainPage(page));
  },
  shoppingCartPage: async ({ page }, use) => {
    await use(new ShoppingCartPage(page));
  },
});

export { expect } from '@playwright/test';
