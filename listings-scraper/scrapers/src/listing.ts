export enum Neighborhood {
  GREENPOINT,
  WILLIAMSBURG,
  EAST_WILLIAMSBURG,
  CARROLL_GARDENS,
  COBBLE_HILL,
  BROOKLYN_HEIGHTS,
  CLINTON_HILL,
  FORT_GREENE,
  PARK_SLOPE,
  PROSPECT_HEIGHTS,
}

export type NeighborhoodNames = { [k in Neighborhood]: string }

export const NEIGHBORHOOD_NAMES = {
  [Neighborhood.GREENPOINT]: "Greenpoint",
  [Neighborhood.WILLIAMSBURG]: "Williamsburg",
  [Neighborhood.EAST_WILLIAMSBURG]: "East Williamsburg",
  [Neighborhood.CARROLL_GARDENS]: "Carroll Gardens",
  [Neighborhood.COBBLE_HILL]: "Cobble Hill",
  [Neighborhood.BROOKLYN_HEIGHTS]: "Brooklyn Heights",
  [Neighborhood.CLINTON_HILL]: "Clinton Hill",
  [Neighborhood.FORT_GREENE]: "Fort Greene",
  [Neighborhood.PARK_SLOPE]: "Park Slope",
  [Neighborhood.PROSPECT_HEIGHTS]: "Prospect Heights"
}

export type Listing = {
  id: string,
  url: URL,
  address: string;
  rent: number;
  images: string[]
  neighborhood?: Neighborhood;

  bedroomCount?: number | "Studio";
  bathroomCount?: number;
  hasBrokerFee?: boolean;
  sqFt?: number
};
