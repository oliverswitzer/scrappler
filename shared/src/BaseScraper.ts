import { chromium, Browser, Page } from "playwright";

export class BaseScraper {
  protected browser: Browser;
  protected page: Page;

  constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  static async create<T extends BaseScraper>(
    this: new (browser: Browser, page: Page) => T
  ): Promise<T> {
    const browser = await chromium.launch({
      headless: process.env.NODE_ENV == "production",
    });

    const context = await browser.newContext();
    context.setDefaultTimeout(10000);

    const page = await context.newPage();

    return new this(browser, page);
  }
}
