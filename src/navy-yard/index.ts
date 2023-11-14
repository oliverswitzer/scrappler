import Scraper from "./scraper";
import { randomDelay } from "../utils/randomDelay";

async function main() {
  await randomDelay(15000);

  const scraper = await Scraper.create();
  await scraper.login();
  await scraper.clickNewVisit();
  await scraper.typeVisitorName();
  await scraper.adjustDateTime();
  await scraper.selectBuilding();
  await scraper.submitVisitorForm();
  await scraper.close();

  console.log("Succesfully created a new visit for Oliver");
}

main();
