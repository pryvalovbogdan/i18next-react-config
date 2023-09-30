import { Page } from '@playwright/test';

import Login from '../locators/Login';

export class Authentication {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    // Navigate to the login page
    await this.page.goto('/login');

    // Fill in the login form
    await this.page.fill(Login.emailInput, username);
    await this.page.fill(Login.passwordInput, password);

    // Submit the form
    await this.page.click(Login.signInButton);

    // Wait for a successful login indicator (could be a specific element on the dashboard, for example)
    await this.page.waitForSelector(Login.countButton);
  }
}
