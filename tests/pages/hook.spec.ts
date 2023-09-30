import { Authentication } from '../preconditions/auth';

import { test, expect } from '@playwright/test';

const username = 'tim@gmail.com';
const password = 'slide123';

test.beforeEach(async ({ page }) => {
  const auth = new Authentication(page);
  await auth.login(username, password);

  await page.goto('/hook');
});

test('should render default state', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'count is 0' })).toBeVisible();
});

test('should render default state click', async ({ page }) => {
  await page.getByRole('button', { name: 'count is 0' }).click();

  await expect(await page.getByRole('button', { name: 'count is 1' })).toBeVisible();
});
