import { BaseScraper } from 'shared';
import StreetEasyScraper from './src/scraping/StreetEasyScraper';
import { Firebase } from './src/scraping/firebase';
import CraigslistScraper from './src/scraping/CraigslistScraper';

class TestScraper extends BaseScraper {
  async test() {
    this.page.goto('https://newyork.craigslist.org/search/apa');
    this.page.pause();
  }
}

const firebase = new Firebase();

async function main() {
  // const testScraper = await TestScraper.create();
  // testScraper.test();

  const craigslistScraper = await CraigslistScraper.create();
  await craigslistScraper.visitHome();
  await craigslistScraper.setPriceRange();
  const craigslistListings = await craigslistScraper.paginateAndRetrieveListings();
  await craigslistScraper.close();
  firebase.storeListings(craigslistListings);

  const streetEasyScraper = await StreetEasyScraper.create();
  await streetEasyScraper.visitHome();
  await streetEasyScraper.searchNeighborhoods();
  const streetEasyListings = await streetEasyScraper.paginateAndRetrieveListings();

  await firebase.storeListings(streetEasyListings);

  await streetEasyScraper.close();
}

main();
