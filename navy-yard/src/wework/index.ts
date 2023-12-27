import WeWorkScraper from "./WeWorkScraper";
import { randomDelay } from "../utils/randomDelay";

async function main() {
  await randomDelay(process.env.NODE_ENV == "production" ? 15000 : 0);

  const scraper = await WeWorkScraper.create();
  await scraper.login();
  await scraper.bookDesk();
  await scraper.close();
}

main();
