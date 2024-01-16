'use client';

import { Paper, Grid, Card, CardContent, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Listing, Neighborhood } from 'rb-shared';

// Randomized additional data for cards
const cards: Listing[] = Array.from({ length: 10 }, (_, index) => ({
  id: `UUID-${index}`,
  url: new URL(`https://placekitten.com/800/400?image=${index}`),
  address: `${index}24 Example St. Apt ${index}B`,
  rent: 2000 + index * 100,
  images: [`https://placekitten.com/800/400?image=${index}`, `https://placekitten.com/800/400?image=${index + 1}`],
  neighborhood: Neighborhood.GREENPOINT,
  bedroomCount: 1,
  bathroomCount: 1,
  hasBrokerFee: index % 2 === 0,
  sqFt: 400 + index * 10
}));

function Home() {
  return (
    <main>
      <Grid container spacing={4} style={{ padding: 24 }}>
        {cards.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card>
              <Carousel autoPlay={false}>
                {card.images.map((imgSrc, i) => (
                  <Paper key={`${card.id}-img-${i}`} elevation={0}>
                    <img className="w-full min-h-[200px] object-cover" src={imgSrc} alt={`Image of ${card.address}`} />
                  </Paper>
                ))}
              </Carousel>

              <CardContent>
                <Typography variant="h5" component="div">
                  {card.address}
                </Typography>
                <Typography color="textSecondary">
                  Rent: ${card.rent} - {card.bedroomCount} Bed, {card.bathroomCount} Bath, {card.sqFt} sqft
                </Typography>
                <Typography color="textSecondary">
                  Neighborhood: {card.neighborhood}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  );
}

export default Home;

