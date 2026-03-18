import {test, expect} from '@playwright/test';

test('Wikipedia Search Test for CI/CD', async ({page}) => {
  // Navigate to Wikipedia
  await page.goto('https://www.wikipedia.org/');

  // 2. Locate the search box and type
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Automation');
  
  // 3. Click the search button
  await page.getByRole('button', { name: 'Search' }).click();
  
  // 4. Verify the page title heading contains our search term
  const heading = page.locator('#firstHeading');
  await expect(heading).toContainText('Automation');
  
  console.log('Search test completed successfully.');
});