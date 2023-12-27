import Scraper from "./scraper";

async function main() {
  /* await wait(); */

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

async function sleep(milliseconds: number) {
  return new Promise((res, rej) => {
    setTimeout(res, milliseconds);
  });
}
async function wait() {
  const twentyMinutesInMillis = 1200000;
  const randomOffsetToSleepMillis = Math.trunc(
    Math.random() * twentyMinutesInMillis
  );

  console.log(
    `Delaying executing of scrapping by a random offset of ${
      randomOffsetToSleepMillis / 1000
    } seconds`
  );

  return sleep(randomOffsetToSleepMillis);
}

main();
