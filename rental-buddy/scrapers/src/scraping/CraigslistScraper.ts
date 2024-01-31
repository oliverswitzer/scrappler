import parsecurrency from 'parsecurrency';
import { ElementHandle } from 'playwright';
import { Listing, ListingSource, Neighborhood } from 'rb-shared';
import { BaseScraper } from 'shared';

export default class CraigslistScraper extends BaseScraper {
  async visitHome() {
    // Should do a broader search eventually, but for now to avoid
    // paginating through a million things its just set to look in park slope (hard coded in URL)
    //
    // await this.page.goto('https://newyork.craigslist.org/search/apa');
    await this.page.goto('https://newyork.craigslist.org/search/apa?query=park%20slope');
  }

  async setPriceRange() {
    await this.page.getByRole('textbox', { name: 'min' }).click();
    await this.page.getByRole('textbox', { name: 'min' }).fill('1250');
    await this.page.getByRole('textbox', { name: 'min' }).press('Tab');
    await this.page.getByRole('textbox', { name: 'max' }).fill('2500');
    await this.page.getByRole('textbox', { name: 'max' }).press('Enter');
  }

  async paginateAndRetrieveListings(): Promise<Listing[]> {
    await this.page.waitForTimeout(2000);

    let listings: Listing[] = [];

    const nextPageButton = await this.nextPageButton();

    const isLastPage = async () =>
      await nextPageButton.evaluate((el) => el.classList.contains('bd-disabled'));

    const pageListings = await this.getListingsOnPage();
    listings = listings.concat(pageListings);
    await nextPageButton.click();

    while (!(await isLastPage())) {
      const pageListings = await this.getListingsOnPage();
      listings = listings.concat(pageListings);
      await nextPageButton.click();
    }

    this.log('reached last page. persisting ', listings.length, ' total listings...');
    this.log('CragistlistScraper: current search', this.page.url());

    return listings;
  }

  async getListingsOnPage(): Promise<Listing[]> {
    await this.page.waitForTimeout(2000);

    this.log('getting this pages listings...');

    const listings: Listing[] = [];
    const listingEls = this.page.locator('.cl-search-result');

    this.log('num listings on page: ', await listingEls.count());

    for (const el of await listingEls.elementHandles()) {
      const url = await extractListingURL(el);

      if (!url) {
        this.log('Could not parse listing: ', await el.textContent(), '. No URL found.');
        continue;
      }

      const address = await extractAddress(el);
      this.log(address);
      const rentAmt = await extractRentAmt.bind(this)(el);
      const images = await extractImages(el);

      // TODO: How do we extract these from less uniform data? ChatGPT?
      //
      // const bedroomCount = await extractBedroomCount(el);
      // const bathroomCount = await extractBathroomCount(el);
      // const sqFt = await extractSquareFootage(el);
      const rawNeighborhood = await extractNeighborhood(el);
      this.log(rawNeighborhood);

      // TODO: We've hardcoded all listings to be in Greenpoint. Again, how do we extract this?
      // if (!neighborhood) {
      //   this.log('Could not parse listing (no neighborhood found): ', url.toString());
      //   continue;
      // }

      // TODO: listingIdHash is based off of address, which as of right now isn't reliable from craigslist.
      // - We are currently hardcoding address to N/a so this will prob have some collisions right now.
      // - May be ok for identifying dupes across only craigslist, but less ideal for identifying dupes across all of
      listings.push({
        id: listingIdHash(address, rentAmt),
        url: new URL(url),
        address: address,
        rent: rentAmt,
        source: ListingSource.CRAIGSLIST,
        images,
        // bedroomCount,
        // bathroomCount,
        // hasBrokerFee,
        // sqFt,
        neighborhood: Neighborhood.GREENPOINT,
      });
    }
    return listings;
  }

  async nextPageButton() {
    return this.page.locator('button.cl-next-page').first();
  }

  log(...args: any[]) {
    console.log('CraigslistScraper:', ...args);
  }
}

async function extractAddress(el: ElementHandle): Promise<string> {
  return 'N/a';
}

async function extractRentAmt(el: ElementHandle): Promise<number> {
  const rentAmtEl = await el.$('.priceinfo');
  let rentAmt = (await rentAmtEl?.textContent())?.trim();
  this.log('rentAmt: ', rentAmt);
  rentAmt = rentAmt?.slice(1, rentAmt.length);
  if (!rentAmt) throw new Error('rent not parseable');

  const parsedRentAmt = parsecurrency(rentAmt)?.value;
  if (!parsedRentAmt) throw new Error('rent not parseable');

  return parsedRentAmt;
}

function listingIdHash(...args: any[]): string {
  const stringifiedArgs = args.map((arg) => JSON.stringify(arg)).join('');
  let hash = 0;

  if (stringifiedArgs.length === 0) return hash.toString();

  for (let i = 0; i < stringifiedArgs.length; i++) {
    const char = stringifiedArgs.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }

  // Convert the hash to a Base64-encoded string
  const base64Hash = Buffer.from(hash.toString()).toString('base64');
  return base64Hash;
}

async function extractImages(listingEl: ElementHandle<Node>) {
  return await listingEl.evaluate((_listingEl) => {
    const rightCarouselButton = (<HTMLElement>_listingEl).querySelector(
      '.slider-forward-arrow.icom-'
    );

    for (let i = 0; i < 20; i++) {
      rightCarouselButton?.dispatchEvent(new Event('click'));
    }

    return Array.from((<HTMLElement>_listingEl).querySelectorAll('img'))
      .map((imgEl) => imgEl.src)
      .map((imgSrc) => imgSrc.replace('300x300', '600x450'))
      .filter((imgSrc) => imgSrc != '');
  });
}

// async function extractBedroomCount(listingsEl: ElementHandle<Node>) {
//   return 999;
// }

// async function extractBathroomCount(listingsEl: ElementHandle<Node>) {
//   const bathroomCountEl = await listingsEl.$(
//     '.listingDetailDefinitionsIcon--bath + .listingDetailDefinitionsText'
//   );
//   const bathroomCount = await bathroomCountEl?.textContent();

//   if (bathroomCount) {
//     return parseInt(bathroomCount);
//   }
// }

// async function extractSquareFootage(listingsEl: ElementHandle<Node>) {
//   const squareFootageEl = await listingsEl.$(
//     '.listingDetailDefinitionsIcon--measure + .listingDetailDefinitionsText'
//   );
//   const squareFootage = await squareFootageEl?.textContent();

//   if (squareFootage) {
//     return parseInt(squareFootage);
//   }
// }

async function extractListingURL(listingEl: ElementHandle<Node>) {
  const urlEl = await listingEl.$('a');
  const url = await urlEl?.getAttribute('href');

  if (url) {
    return new URL(url);
  }
}

async function extractNeighborhood(el: ElementHandle<Node>) {
  const metaEl = await el.$('metElTextlmeta');
  const metaElText = await metaEl?.textContent();
  const metaTextSplit: string[] | undefined = metaElText?.split('·');

  if (metaTextSplit && metaTextSplit.length > 0) {
    const rawNeighborhoodText = metaTextSplit[metaTextSplit.length - 1];
    return rawNeighborhoodText?.trim();
  }
}
