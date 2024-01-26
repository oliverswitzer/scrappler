import React from 'react';
import { Paper, Grid, Card, CardContent, Typography, Link } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Listing, NEIGHBORHOOD_ENUM_TO_STRING_MAP } from 'rb-shared';
import { ListingSourceIcon } from './ListingSourceIcon';

export const Listings = ({ listings }: { listings: Listing[] }) => {
  return (
    <Grid data-listings={JSON.stringify(listings)} container spacing={4} style={{ padding: 24 }}>
      {listings.map((listing) => (
        <Grid key={`listing-${listing.id}`} item xs={12} sm={12} md={4}>
          <Card className="relative">
            <Carousel autoPlay={false}>
              {listing.images.map((imgSrc: string, i: number) => (
                <Paper
                  className="overflow-clip h-[250px]"
                  key={`${listing.id}-img-${i}`}
                  elevation={0}
                >
                  <a target="_blank" rel="noopener" href={listing.url.toString()}>
                    <img
                      className="w-full h-full object-cover"
                      src={imgSrc}
                      alt={`Image of ${listing.address}`}
                    />
                  </a>
                </Paper>
              ))}
            </Carousel>

            <CardContent>
              <Link underline="none" target="_blank" rel="noopener" href={listing.url.toString()}>
                <Typography variant="h5" component="div">
                  {listing.address}
                </Typography>
                <Typography color="textSecondary">
                  Rent: ${listing.rent} - {listing.bedroomCount} Bed, {listing.bathroomCount} Bath,{' '}
                  {listing.sqFt} sqft
                </Typography>
                <Typography color="textSecondary">
                  Neighborhood: {NEIGHBORHOOD_ENUM_TO_STRING_MAP[listing.neighborhood]}
                </Typography>
              </Link>
            </CardContent>
            <ListingSourceIcon
              className="absolute bottom-5 right-5"
              listingSource={listing.source}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
