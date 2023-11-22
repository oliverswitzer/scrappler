import { Browser, Page } from "playwright";
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

// https://www.npmjs.com/package/playwright-extra
// https://github.com/berstend/puppeteer-extra/tree/39248f1f5deeb21b1e7eb6ae07b8ef73f1231ab9/packages/puppeteer-extra-plugin-stealth
// https://github.com/berstend/puppeteer-extra/tree/39248f1f5deeb21b1e7eb6ae07b8ef73f1231ab9/packages/puppeteer-extra-plugin-anonymize-ua
// https://github.com/berstend/puppeteer-extra/tree/master/packages/plugin-proxy-router

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
    chromium.use(stealth());
    const browser = await chromium.launch({
      headless: process.env.NODE_ENV == "production",
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    if (process.env.NODE_ENV !== "production") {
      context.setDefaultTimeout(60000);
      /* console.log("Testing the stealth plugin.."); */
      /* await page.goto("https://bot.sannysoft.com", { */
      /*   waitUntil: "networkidle", */
      /* }); */
      /* await page.screenshot({ path: "stealth.png", fullPage: true }); */
      /* console.log("FINISHED Testing the stealth plugin.."); */
    } else {
      context.setDefaultTimeout(Infinity);
    }

    return new this(browser, page);
  }

  async close() {
    await this.browser.close();
  }
}
