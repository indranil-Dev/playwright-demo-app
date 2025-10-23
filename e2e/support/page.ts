import { chromium, Page, Browser, BrowserContext } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

export async function createPage() {
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 500, // Add 0.5 second delay between actions
  });
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  page = await context.newPage();
  return page;
}

export async function closeBrowser() {
  if (context) await context.close();
  if (browser) await browser.close();
}

export { browser, page };