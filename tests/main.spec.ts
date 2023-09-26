import { test, expect } from '@playwright/test';

import { setLocalStorage } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('has title React', async ({ page }) => {
  await expect(page).toHaveTitle(/React/);
});

test('should switch language and text to [DE]', async ({ page }) => {
  await setLocalStorage(page, 'token', '123');
  await page.waitForFunction(() => {
    return localStorage.getItem('token');
  });
  await page.getByRole('button', { name: 'de' }).click();

  await expect(page.getByRole('heading')).toHaveText('[DE] React');
});

test('should redirect into login page', async ({ page }) => {
  await page.getByRole('button', { name: 'de' }).click();

  await expect(page.getByRole('heading')).toHaveText('Sign in to your account');
});

test('should redirect into main page', async ({ page }) => {
  await setLocalStorage(page, 'token', '123');
  await page.waitForFunction(() => {
    return localStorage.getItem('token');
  });

  await expect(page.getByRole('heading')).toHaveText('React');
});
