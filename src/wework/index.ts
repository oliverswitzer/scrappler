import Scraper from "./scraper";
import { randomDelay } from "../utils/randomDelay";

async function main() {
  await randomDelay(15000);

  const scraper = await Scraper.create();
  await scraper.login();
  await scraper.bookDesk();
  await scraper.close();

  console.log("Succesfully created a new WeWork visit for Oliver");
}

main();
