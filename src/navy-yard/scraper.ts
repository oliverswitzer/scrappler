import { chromium, Browser, Page } from "playwright";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const password = process.env.NAVY_YARD_PASSWORD;
const email = process.env.NAVY_YARD_EMAIL;

if (!email || !password)
  throw new Error("EMAIL and PASSWORD must be set in .env");

class Scraper {
  private browser: Browser;
  private page: Page;

  private constructor(browser: Browser, page: Page) {
    this.browser = browser;
    this.page = page;
  }

  static async create() {
    const browser = await chromium.launch({
      // headless: false, // Enable this if you want to see whats happening in a browser when the script runs
    });
    const page = await browser.newPage();
    return new Scraper(browser, page);
  }

  async login() {
    if (!password || !email) {
      return;
    }

    await this.page.goto("https://app.proxyclick.com/login");
    await this.page.fill("input#input-username", email);
    await this.page.fill("input#input-password", password);
    await this.page.click('button[type="submit"]');
  }

  async clickNewVisit() {
    console.log("clickNewVisit");
    await this.page.click('a[pxc-tracker="logbook-new-visit-button"]');
  }

  async typeVisitorName() {
    console.log("typeVisitorName");
    await this.page.click("input#pxc-enhanced-typeahead");
    await this.page.type("input#pxc-enhanced-typeahead", "Oliver Switzer");
    await this.page.click("li#pxc-enhanced-typeahead-item-1");
  }

  async adjustDateTime() {
    console.log("adjustDateTime");
    await this.page.click("button.pxc-date-range-selector__dropdown-toggle");

    await this.page.getByRole("combobox").nth(1).selectOption("number:540"); // 9am
    await this.page.getByRole("combobox").nth(2).selectOption("number:1380"); // 11pm
    await this.page.click("button.pxc-date-range-selector__dropdown-toggle");
  }

  async selectBuilding() {
    console.log("selectBuilding");
    await this.page.getByText("[Select]").nth(1).click();
    await this.page.getByText("Building 77").click();
    console.log("selectBuilding End");
  }

  async submitVisitorForm() {
    console.log("submitVisitorForm");
    await this.page.locator(".l-grid").first().click();
    await this.page.getByRole("button", { name: "Save & create new" }).click();

    await this.page.waitForTimeout(1500);
  }

  async close() {
    await this.browser.close();
  }
}

export default Scraper;
