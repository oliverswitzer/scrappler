import { ListingSource } from 'rb-shared';
import Image from 'next/image';
import { Tooltip } from '@mui/material';

export const ListingSourceIcon = ({
  listingSource,
  className,
}: {
  listingSource: ListingSource;
  className: string;
}) => {
  if (listingSource == ListingSource.STREET_EASY) {
    return (
      <Tooltip title="Sourced from StreetEasy">
        <Image
          className={`${className} opacity-60 rounded-md`}
          width={25}
          height={25}
          alt="StreetEasy Logo"
          src="/streeteasy-logo.png"
        />
      </Tooltip>
    );
  } else if (listingSource == ListingSource.CRAIGSLIST) {
    return (
      <Tooltip title="Sourced from Craigslist">
        <Image
          className={`${className} opacity-90 rounded-md`}
          width={27}
          height={25}
          alt="Craigslist Logo"
          src="/craigslist-logo.png"
        />
      </Tooltip>
    );
  }
};
