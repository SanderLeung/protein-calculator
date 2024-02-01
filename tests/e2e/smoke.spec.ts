import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test.describe('Smoke Test', () => {
    test('create new grocery item', async ({ page }) => {
        await page.locator('div').filter({ hasText: /^Grocery List$/ }).getByRole('link').click();
        await page.getByRole('textbox').click();
        await page.getByRole('textbox').fill('test item');
        await page.locator('div').filter({ hasText: /^protein$/ }).getByRole('spinbutton').fill('20');
        await page.locator('div').filter({ hasText: /^calories$/ }).getByRole('spinbutton').fill('200');
        await page.locator('div').filter({ hasText: /^servings$/ }).getByRole('spinbutton').fill('20');
        await page.locator('div').filter({ hasText: /^cost$/ }).getByRole('spinbutton').fill('20');
        await page.getByRole('button', { name: 'Save' }).click();

        await expect(page.locator('tbody')).toContainText('test item');
//    });

//    test('grocery item info', async ({ page }) => {
        await page.getByRole('row', { name: 'test item 40.00% 20.00g/$' }).getByRole('link').first().click();
        
        await expect(page.locator('#root')).toContainText('test item');
        await expect(page.getByRole('link').nth(1)).toBeVisible();
        await expect(page.getByRole('link').nth(2)).toBeVisible();
//    });

//    test('edit grocery item', async ({ page }) => {
        await page.getByRole('link').nth(1).click();
        await page.getByRole('textbox').fill('test item x');
        await page.getByRole('button', { name: 'Save' }).click();

        await expect(page.locator('tbody')).toContainText('test item x');
//    });

//    test('delete grocery item', async ({ page }) => {
        await page.getByRole('row',{ name: 'test item x 40.00% 20.00g/$' }).getByRole('link').nth(2).click();
        await page.getByRole('button', { name: 'Yes, Delete it' }).click();

        await expect(page.locator('#root')).not.toContainText('test item');
    });
});