import { test as setup } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { LoginPage } from '../src/pages/login/login.page.js';

const authFile = path.resolve('.auth/user.json');

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Set ${name} in .env before running tests.`);
  return value;
}

setup('Authenticate through UI', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.fillForm(requireEnv('TEST_USERNAME'), requireEnv('TEST_PASSWORD'));

  await mkdir(path.dirname(authFile), { recursive: true });
  await page.context().storageState({ path: authFile, indexedDB: true });
});
