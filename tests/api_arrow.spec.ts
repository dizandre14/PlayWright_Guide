import { test, expect } from '@playwright/test';


interface PhoneData {
    id: string;
    name: string;
}

const extractFirstPhone = (phones: PhoneData[]): PhoneData => {
    return phones[0];
}

test('API GET Request and TS Arrow Function', async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/objects');

    expect(response.ok()).toBeTruthy();

    const allPhones: PhoneData[] = await response.json();

    const firstPhone = extractFirstPhone(allPhones);

    console.log('First phone extracted:', firstPhone);

    expect(firstPhone).toHaveProperty('id');
    expect(firstPhone).toHaveProperty('name');
});