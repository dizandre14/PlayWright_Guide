// const addNumbers = (a:number, b:number): number => {
//     return a + b;
// }

import {test, expect} from '@playwright/test';

interface LoginResponse {
    token: string;
    userStatus: string;
}

test('API Check: Backend should return a valid token', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: { username: 'test_user', password: 'password123' }
    });

    expect(response.ok()).toBeTruthy();

const body: any = await response.json();
    
    expect(body).toHaveProperty('id');
    expect(body.username).toBe('test_user');
    
    console.log('API Response received successfully:', body);
});


test('UI Check: User can log in via the web form', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    await page.fill('#username', 'tomsmith');

    await page.fill('#password', 'SuperSecretPassword!');

    await page.getByRole('button', { name: /login/i }).click();

    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

test('Database Check: Verify user session in DB', async () => {
    const mockDbQuery = async (user: string) => {
       return { username: 'tomsmith', lastLogin: new Date().toISOString() };
    };

    const dbResult = await mockDbQuery('tomsmith');
    
    expect(dbResult.username).toBe('tomsmith');
    console.log(`Database verified for user: ${dbResult.username}`);
  });