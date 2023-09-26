import { Page } from '@playwright/test';

export async function setLocalStorage(page: Page, name: string, value: any) {
  return page.evaluate(
    async ([n, v]) => {
      return new Promise((resolve, reject) => {
        try {
          localStorage.setItem(n, v);
          resolve(null);
        } catch (error) {
          reject(error);
        }
      });
    },
    [name, value],
  );
}

