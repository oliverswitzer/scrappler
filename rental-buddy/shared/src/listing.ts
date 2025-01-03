export enum Neighborhood {
  GREENPOINT = 'GREENPOINT',
  WILLIAMSBURG = 'WILLIAMSBURG',
  EAST_WILLIAMSBURG = 'EAST_WILLIAMSBURG',
  CARROLL_GARDENS = 'CARROLL_GARDENS',
  COBBLE_HILL = 'COBBLE_HILL',
  BROOKLYN_HEIGHTS = 'BROOKLYN_HEIGHTS',
  CLINTON_HILL = 'CLINTON_HILL',
  FORT_GREENE = 'FORT_GREENE',
  PARK_SLOPE = 'PARK_SLOPE',
  PROSPECT_HEIGHTS = 'PROSPECT_HEIGHTS',
}

export enum ListingSource {
  STREET_EASY = 'STREET_EASY',
  CRAIGSLIST = 'CRAIGSLIST',
}

export type NeighborhoodNames = { [k in Neighborhood]: string };

export const NEIGHBORHOOD_ENUM_TO_STRING_MAP: NeighborhoodNames = {
  [Neighborhood.GREENPOINT]: 'Greenpoint',
  [Neighborhood.WILLIAMSBURG]: 'Williamsburg',
  [Neighborhood.EAST_WILLIAMSBURG]: 'East Williamsburg',
  [Neighborhood.CARROLL_GARDENS]: 'Carroll Gardens',
  [Neighborhood.COBBLE_HILL]: 'Cobble Hill',
  [Neighborhood.BROOKLYN_HEIGHTS]: 'Brooklyn Heights',
  [Neighborhood.CLINTON_HILL]: 'Clinton Hill',
  [Neighborhood.FORT_GREENE]: 'Fort Greene',
  [Neighborhood.PARK_SLOPE]: 'Park Slope',
  [Neighborhood.PROSPECT_HEIGHTS]: 'Prospect Heights',
};

export const NEIGHBORHOOD_NAMES_TO_ENUM_MAP: { [key: string]: Neighborhood } = Object.fromEntries(
  Object.entries(NEIGHBORHOOD_ENUM_TO_STRING_MAP).map(([key, value]) => [
    value,
    Neighborhood[key as keyof typeof Neighborhood],
  ])
);

export function isListing(obj: any): obj is Listing {
  return 'neighborhood' in obj && Object.values(Neighborhood).includes(obj.neighborhood);
}
export type Listing = {
  id: string;
  url: URL;
  address: string;
  rent: number;
  images: string[];
  neighborhood: Neighborhood;
  source: ListingSource;

  bedroomCount?: number | 'Studio';
  bathroomCount?: number;
  hasBrokerFee?: boolean;
  sqFt?: number;
};
