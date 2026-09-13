import { test } from '../src/fixtures/base.fixture.js';
import { faker } from '@faker-js/faker';
import type { ContactDto } from '../src/types/contactData.types.js';

const newContact = {
  contactType: faker.lorem.word(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phonePrefix: '+380',
  phoneNumber: faker.number.int({ min: 1000000, max: 9999999 }).toString(),
  comment: faker.lorem.sentence(),
  allowSupportRequests: true,
} satisfies ContactDto;

const editedContact = {
  contactType: faker.lorem.word(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phoneNumber: faker.number.int({ min: 1000000, max: 9999999 }).toString(),
  comment: faker.lorem.sentence(),
  allowSupportRequests: false,
} satisfies ContactDto;

test.describe('', () => {
  test('Verify contact flow', async ({ contactFormPage, contactsPage }) => {
    await test.step('Create new contact', async () => {
      await contactFormPage.open();
      await contactFormPage.fillModal(newContact);
      await contactFormPage.clickCreateButton();
    });

    await test.step('Verify created contact', async () => {
      const contactRow = await contactsPage.table.getRowByName(newContact.contactType);
      await contactRow.clickEditButton();
      await contactFormPage.verifyModal(newContact);
    });

    await test.step('Edit contact and verify changes', async () => {
      await contactFormPage.fillModal(editedContact);
      await contactFormPage.clickSaveButton();
      const editedContactRow = await contactsPage.table.getRowByName(editedContact.contactType);
      await editedContactRow.clickEditButton();
      await contactFormPage.verifyModal(editedContact);
      await contactFormPage.goBack();
      await contactsPage.expectLoaded();
    });

    await test.step('Delete contact and verify it is removed from the table', async () => {
      const editedContactRow = await contactsPage.table.getRowByName(editedContact.contactType);

      await editedContactRow.clickDeleteButton();
      await contactsPage.deleteDialog.clickDeleteButton();
      await contactsPage.table.verifyRowNotPresent(editedContact.contactType!);
    });
  });
});
