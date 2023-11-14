import { chromium, Browser, Page } from "playwright";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const password = process.env.WEWORK_PASSWORD;
const email = process.env.WEWORK_EMAIL;

if (!email || !password)
  throw new Error("WeWork EMAIL and PASSWORD must be set in .env");

class Scraper {
  private browser: Browser;
  private page: Page;

  private constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  static async create() {
    const browser = await chromium.launch({
      headless: false, // Enable this if you want to see whats happening in a browser when the script runs
    });
    const page = await browser.newPage();
    return new Scraper(browser, page);
  }

  async login() {
    if (!email || !password) return;

    await this.page.goto(
      "https://members.wework.com/workplaceone/content2/login/welcome"
    );
    await this.page.getByRole("button", { name: "Member log in" }).click();
    await this.page.getByPlaceholder("Email address").click();
    await this.page.getByPlaceholder("Email address").fill(email);
    await this.page.getByPlaceholder("Email address").press("Tab");
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByLabel("Continue").click();
  }

  async bookDesk() {
    await this.page.getByRole("button", { name: "Book space" }).click();
    await this.page.getByRole("link", { name: "Desks" }).click();
    await this.page.getByRole("button", { name: "Book a desk" }).click();
    await this.page.getByRole("button", { name: "Book for 0 credits" }).click();
    await this.page.getByRole("button", { name: "Done" }).click();
  }

  async close() {
    await this.browser.close();
  }
}

export default Scraper;
