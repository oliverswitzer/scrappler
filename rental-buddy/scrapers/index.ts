import { BaseScraper } from 'shared';
import StreetEasyScraper from './src/scraping/StreetEasyScraper';
import { Firebase } from './src/scraping/firebase';

class TestScraper extends BaseScraper {
  async test() {
    this.page.goto('https://streeteasy.com');
    this.page.pause();
  }
}

const firebase = new Firebase();

async function main() {
  // const testScraper = await TestScraper.create();
  // testScraper.test();
  const scraper = await StreetEasyScraper.create();
  await scraper.visitHome();
  await scraper.searchNeighborhoods();
  const listings = await scraper.paginateAndRetrieveListings();

  await firebase.storeListings(listings);

  await scraper.close();
}

main();
