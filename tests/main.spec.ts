import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
});

test('has title React', async ({ page }) => {
  await expect(page).toHaveTitle(/React/);
});

test('should switch language and text to [DE]', async ({ page }) => {
  await page.getByRole('button', { name: 'de' }).click();

  await expect(page.getByRole('heading')).toHaveText('[DE] React');
});
