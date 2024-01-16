import React from 'react'
import { Paper, Grid, Card, CardContent, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Listing } from 'rb-shared';

export const Listings = ({ listings }: { listings: Listing[] }) => {
  return <Grid container spacing={4} style={{ padding: 24 }}>
    {listings.map(listing => (
      <Grid item xs={12} sm={6} md={4} key={listing.id}>
        <Card>
          <Carousel autoPlay={false}>
            {listing.images.map((imgSrc: string, i: number) => (
              <Paper key={`${listing.id}-img-${i}`} elevation={0}>
                <img className="w-full min-h-[200px] object-cover" src={imgSrc} alt={`Image of ${listing.address}`} />
              </Paper>
            ))}
          </Carousel>

          <CardContent>
            <Typography variant="h5" component="div">
              {listing.address}
            </Typography>
            <Typography color="textSecondary">
              Rent: ${listing.rent} - {listing.bedroomCount} Bed, {listing.bathroomCount} Bath, {listing.sqFt} sqft
            </Typography>
            <Typography color="textSecondary">
              Neighborhood: {listing.neighborhood}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
}
