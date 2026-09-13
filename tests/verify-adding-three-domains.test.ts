import { test } from '../src/fixtures/base.fixture.js';

const indexes = [2, 1, 0] as const;
test.describe('', () => {
  test(`Verify adding three domains`, async ({ registerDomainPage, shoppingCartPage }) => {
    let domainPrice = 0;
    await test.step('Add three domains to cart', async () => {
      await registerDomainPage.open();
      await registerDomainPage.searchDomain('com');

      for (const index of indexes) {
        const availableRow = await registerDomainPage.table.getAvailableRowByIndex(index);
        await availableRow.expectLoaded();
        domainPrice += await availableRow.getPrice();
        await availableRow.clickAddToCart();
        await registerDomainPage.closeNotification();
      }
    });

    await test.step('Verify correct price in shopping cart', async () => {
      await registerDomainPage.header.clickBasketButton();
      await shoppingCartPage.verifyTotalPrice(domainPrice);
    });
  });

  test.afterEach(async ({ shoppingCartPage }) => {
    for (const index of indexes) {
      const row = await shoppingCartPage.table.getRowByIndex(index);
      await row.clickDeleteButton();
    }
  });
});
