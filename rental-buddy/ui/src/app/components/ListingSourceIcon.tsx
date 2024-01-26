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
          className={`${className} rounded-md`}
          width={25}
          height={25}
          alt="StreetEasy Logo"
          src="/streeteasy-logo.png"
        />
      </Tooltip>
    );
  }
};
