import { test, expect } from '@playwright/test';

test('Mock an API to simulate a frontend scenario', async ({ page }) => {
  
  // 1. THE INTERCEPT: We tell Playwright to listen for any network request ending in '/api/v1/fruits'
  await page.route('*/**/api/v1/fruits', async route => {
    
    // 2. THE MOCK: Instead of letting the request hit the real server, we fulfill it with our own JSON.
    const fakeData = [
        { name: 'Fake Automation Fruit', id: 1 },
        { name: 'TypeScript Berry', id: 2 }
    ];
    
    await route.fulfill({ json: fakeData });
  });

  // 3. THE UI NAVIGATION: Load the official Playwright demo page that automatically calls the fruits API.
  await page.goto('https://demo.playwright.dev/api-mocking');

  // 4. THE VALIDATION: Prove the frontend displayed our fake data instead of the real database data.
  await expect(page.getByText('Fake Automation Fruit')).toBeVisible();
  await expect(page.getByText('TypeScript Berry')).toBeVisible();
  
  console.log('Successfully intercepted the API and injected fake data into the UI.');
});