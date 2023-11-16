import { BaseScraper } from "../utils/BaseScraper";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const password = process.env.WEWORK_PASSWORD;
const email = process.env.WEWORK_EMAIL;

if (!email || !password)
  throw new Error("WeWork EMAIL and PASSWORD must be set in .env");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class WeWorkScraper extends BaseScraper {
  async login() {
    console.log("Logging in to WeWork...");
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

    console.log("Successfully logged in to WeWork");
  }

  async bookDesk() {
    console.log("Booking a desk...");

    await this.page.getByRole("button", { name: "Book space" }).click();
    await this.page.getByRole("link", { name: "Desks" }).click();

    // Seemingly necessary to wait for the selectors in the eval below to be present...
    await delay(10000);

    const res = await this.page.evaluate(async () => {
      // @ts-ignore
      document
        .querySelectorAll(".book-desk-button")[0]
        .dispatchEvent(new Event("click"));
    });

    await this.page.getByRole("button", { name: "Book for 0 credits" }).click();
    await this.page.getByRole("button", { name: "Done" }).click();

    console.log("Successfully booked desk at WeWork!");
  }

  async close() {
    await this.browser.close();
  }
}
