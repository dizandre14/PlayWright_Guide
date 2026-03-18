import { test, expect } from '@playwright/test';

// 1. THE INTERFACE: Defining the exact structure of the data we expect.
interface PhoneData {
  id: string;
  name: string;
}

// 2. THE ARROW FUNCTION
// It takes an array of PhoneData and returns a single PhoneData object.
const extractFirstPhone = (phones: PhoneData[]): PhoneData => {
  return phones[0];
};

test('API GET Request and TS Arrow Function', async ({ request }) => {
  // 3. THE API CALL
  const response = await request.get('https://api.restful-api.dev/objects');
  
  // Guarantee the server responded successfully (Status 200 OK)
  expect(response.ok()).toBeTruthy();

  // 4. PARSING THE DATA
  const allPhones: PhoneData[] = await response.json();

  // 5. USING THE ARROW FUNCTION
  const firstPhone = extractFirstPhone(allPhones);
  
  console.log(`The first phone in the database is: ${firstPhone.name}`);

  // 6. ASSERTION
  expect(firstPhone).toHaveProperty('id');
  expect(firstPhone).toHaveProperty('name');
});