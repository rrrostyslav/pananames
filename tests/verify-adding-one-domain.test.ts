import { test } from '../src/fixtures/base.fixture.js';

const domains = ['com', 'net', 'org'] as const;
test.describe('', () => {
  for (const domain of domains) {
    test(`Verify adding a new domain "${domain}"`, async ({ registerDomainPage, shoppingCartPage }) => {
      let domainPrice: number;
      await test.step('Add domain to cart', async () => {
        await registerDomainPage.open();
        await registerDomainPage.searchDomain(domain);

        const availableRow = await registerDomainPage.table.getAvailableRowByIndex(0);
        await availableRow.expectLoaded();
        domainPrice = +(await availableRow.getPrice());
        await availableRow.clickAddToCart();
        await registerDomainPage.closeNotification();
      });

      await test.step('Verify correct price in shopping cart', async () => {
        await registerDomainPage.header.clickBasketButton();
        await shoppingCartPage.verifyTotalPrice(domainPrice);
      });
    });
  }

  test.afterEach(async ({ shoppingCartPage }) => {
    const row = await shoppingCartPage.table.getRowByIndex(0);
    await row.clickDeleteButton();
  });
});
