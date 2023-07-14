import Scraper from "./scraper";

const twentyMinutesInMillis = 1200000;
async function main() {
  const randomOffsetToSleepMillis = Math.trunc(
    Math.random() * twentyMinutesInMillis
  );

  console.log(
    `Delaying executing of scrapping by a random offset of ${
      randomOffsetToSleepMillis / 1000
    } seconds`
  );

  await sleep(randomOffsetToSleepMillis);
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

main();
