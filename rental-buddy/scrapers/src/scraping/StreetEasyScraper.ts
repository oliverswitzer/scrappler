import parsecurrency from 'parsecurrency';
import { ElementHandle } from 'playwright';
import { BaseScraper } from 'shared';
import {
  Listing,
  ListingSource,
  Neighborhood,
  NEIGHBORHOOD_ENUM_TO_STRING_MAP,
  NEIGHBORHOOD_NAMES_TO_ENUM_MAP,
} from 'rb-shared';

export default class StreetEasyScraper extends BaseScraper {
  async visitHome() {
    await this.page.goto('https://streeteasy.com');
  }

  async searchNeighborhoods() {
    await this.page.getByRole('button', { name: 'Choose neighborhoods or boroughs' }).click();

    const neighborhoods = [
      Neighborhood.GREENPOINT,
      Neighborhood.WILLIAMSBURG,
      Neighborhood.EAST_WILLIAMSBURG,
      Neighborhood.CARROLL_GARDENS,
      Neighborhood.COBBLE_HILL,
      Neighborhood.BROOKLYN_HEIGHTS,
      Neighborhood.CLINTON_HILL,
      Neighborhood.FORT_GREENE,
      Neighborhood.PARK_SLOPE,
      Neighborhood.PROSPECT_HEIGHTS,
    ];

    for (const neighborhood of neighborhoods) {
      await this.addNeighborhoodToSearch(NEIGHBORHOOD_ENUM_TO_STRING_MAP[neighborhood]);
    }

    await this.page.getByRole('button', { name: 'Done' }).click();
    await this.page.getByPlaceholder('Min').click();
    await this.page.getByRole('option', { name: '$1,250' }).click();
    await this.page.getByPlaceholder('Max').click();
    await this.page.getByRole('option', { name: '$2,500' }).click();
    // await this.page.getByLabel("No fee").check();
    await this.page
      .locator('[class*=SearchModuleWrapper] button[type=submit][class*=styled]')
      .click();
    await this.page.getByRole('button', { name: 'Search' }).nth(1).click();
  }

  async addNeighborhoodToSearch(neighborhood: string) {
    await this.page.getByLabel('Neighborhoods and Boroughs').click();
    await this.page.getByLabel('Neighborhoods and Boroughs').fill(neighborhood);
    await this.page.getByRole('option', { name: neighborhood, exact: true }).click();
  }

  async paginateAndRetrieveListings(): Promise<Listing[]> {
    await this.page.waitForTimeout(2000);

    let listings: Listing[] = [];

    const nextPageButton = await this.nextPageButton();

    const pageListings = await this.getListingsOnPage();
    listings = listings.concat(pageListings);
    await nextPageButton.click();

    while ((await nextPageButton.count()) > 0) {
      const pageListings = await this.getListingsOnPage();
      listings = listings.concat(pageListings);
      await nextPageButton.click();
    }

    console.log('reached last page. persisting ', listings.length, ' total listings...');
    console.log('current streeteasy search', this.page.url());

    return listings;
  }

  async getListingsOnPage(): Promise<Listing[]> {
    await this.page.waitForTimeout(2000);

    console.log('getting this pages listings...');

    const listings: Listing[] = [];
    const listingEls = this.page.locator('.searchCardList--listItem');

    console.log('num listings on page: ', await listingEls.count());

    for (const el of await listingEls.elementHandles()) {
      const url = await extractListingURL(el);

      if (!url) {
        console.log('Could not parse listing: ', await el.textContent(), '. No URL found.');
        continue;
      }

      const address = await extractAddress(el);
      const rentAmt = await extractRentAmt(el);
      const images = await extractImages(el);
      const bedroomCount = await extractBedroomCount(el);
      const bathroomCount = await extractBathroomCount(el);
      const hasBrokerFee = !(await el.$('.NoFeeBadge'));
      const sqFt = await extractSquareFootage(el);
      const neighborhood = await extractNeighborhood(el);

      if (!neighborhood) {
        console.log('Could not parse listing (no neighborhood found): ', url.toString());
        continue;
      }

      listings.push({
        id: listingIdHash(address, rentAmt),
        url: new URL(url),
        address: address,
        rent: rentAmt,
        source: ListingSource.STREET_EASY,
        images,
        bedroomCount,
        bathroomCount,
        hasBrokerFee,
        sqFt,
        neighborhood,
      });
    }
    return listings;
  }

  async nextPageButton() {
    return this.page.getByRole('link', { name: 'Next ' });
  }
}

async function extractAddress(el: ElementHandle): Promise<string> {
  const addrEl = await el.$('address');
  const address = (await addrEl?.textContent())?.trim();
  if (!address) throw new Error('address not parseable');

  return address;
}
async function extractRentAmt(el: ElementHandle): Promise<number> {
  const rentAmtEl = await el.$('.price');
  let rentAmt = (await rentAmtEl?.textContent())?.trim();
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
      '[aria-label="Gallery Navigate Right"]'
    );

    for (let i = 0; i < 10; i++) {
      rightCarouselButton?.dispatchEvent(new Event('click'));
    }

    return Array.from((<HTMLElement>_listingEl).querySelectorAll('img'))
      .map((imgEl) => imgEl.src)
      .map((imgSrc) => imgSrc.replace('300x300', '600x450'));
  });
}

async function extractBedroomCount(listingsEl: ElementHandle<Node>) {
  const bedrooomCountEl = await listingsEl.$(
    '.listingDetailDefinitionsIcon--bed + .listingDetailDefinitionsText'
  );
  const bedroomCount = await bedrooomCountEl?.textContent();

  if (bedroomCount?.includes('Studio')) {
    return 'Studio';
  } else if (bedroomCount) {
    return parseInt(bedroomCount);
  }
}

async function extractBathroomCount(listingsEl: ElementHandle<Node>) {
  const bathroomCountEl = await listingsEl.$(
    '.listingDetailDefinitionsIcon--bath + .listingDetailDefinitionsText'
  );
  const bathroomCount = await bathroomCountEl?.textContent();

  if (bathroomCount) {
    return parseInt(bathroomCount);
  }
}

async function extractSquareFootage(listingsEl: ElementHandle<Node>) {
  const squareFootageEl = await listingsEl.$(
    '.listingDetailDefinitionsIcon--measure + .listingDetailDefinitionsText'
  );
  const squareFootage = await squareFootageEl?.textContent();

  if (squareFootage) {
    return parseInt(squareFootage);
  }
}

async function extractListingURL(listingEl: ElementHandle<Node>) {
  const urlEl = await listingEl.$('.listingCard-globalLink');
  const url = await urlEl?.getAttribute('href');

  if (url) {
    return new URL(url);
  }
}

async function extractNeighborhood(el: ElementHandle<Node>) {
  const neighborhoodEl = await el.$('.listingCardBottom--upperBlock');
  const neighborhoodText = await neighborhoodEl?.textContent();

  if (neighborhoodText) {
    const match = neighborhoodText.match(/(Condo|Rental Unit) in (.*)/);

    if (match) {
      const neighborhood = match[2];
      return NEIGHBORHOOD_NAMES_TO_ENUM_MAP[neighborhood];
    }
  }
}
