import { chromium } from 'playwright';

jest.setTimeout(90000);

describe('Simple playwright test', () => {
  it('should open google', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://www.google.com');
    expect(await page.title()).toEqual('Google');
    await browser.close();
  });
})

describe('Simple playwright test on selenium grid', () => {
  it('should open google', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://www.google.com');
    expect(await page.title()).toEqual('Google');
    await browser.close();
  });
})
